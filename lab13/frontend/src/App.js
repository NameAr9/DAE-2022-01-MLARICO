import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useEffect} from 'react';

function App() {
    const [series,setSeries] = useState([]);
    const [pos,setPos] = useState(null);
    const [titulo,setTitulo] = useState('Nuevo');
    const [id,setId] = useState(0);
    const [nombre,setNombre] = useState('');
    const [fecha,setFecha] = useState('');
    const [rating,setRating] = useState(0);
    const [categoria,setCategoria] = useState('');
   
  useEffect(()=>{
    axios.get('http://localhost:8000/series')
    .then(res => {
      console.log(res.data);
      setSeries(res.data);
    })
  })


  function mostrar(cod,index){
    axios.get('http://localhost:8000/serie/'+cod)
    .then(res =>{
      
      setPos(index);
      setTitulo('Editar');
      setId(res.data.id);
      setNombre(res.data.name);
      setFecha(res.data.release_date);
      setRating(res.data.rating);
      setCategoria(res.data.category);
    });
  }

  function guardar(e){
    e.preventDefault();
    let cod = id;
    let datos = {
      name: nombre,
      release_date: fecha,
      rating: rating,
      category: categoria
    }
    if(cod>0){
      axios.put('http://localhost:8000/serie/'+cod,datos)
      .then(res =>{
        let indx = pos;
        series[indx] = res.data;
        var temp = series;
        setPos(null);
        setTitulo('Editar');
        setId(0);
        setNombre('');
        setFecha('');
        setRating('');
        setCategoria('');
        setSeries(temp);
        
      }).catch((error)=>{
        console.log(error.toString());
      });
    }else{
      axios.post('http://localhost:8000/series',datos)
      .then(res =>{
        series.push(res.data);
        var temp = series;
        setPos(null);
        setTitulo('Editar');
        setId(0);
        setNombre('');
        setFecha('');
        setRating('');
        setCategoria('');
        setSeries(temp);
        
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }
   function eliminar(cod){
    let rpta = window.confirm('Desea eliminar registro?');
    if(rpta){
      axios.delete('http://localhost:8000/serie/'+cod)
        .then(res =>{
          var temp = series.filter((serie)=>serie.id !== cod);
          setSeries(temp);
      })
    }
  }
    return(
      <div>
        <br/>
          <Container>
                <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th><center>#</center></th>
                    <th><center>Nombre</center></th>
                    <th><center>Fecha</center></th>
                    <th><center>Rating</center></th>
                    <th><center>Categoria</center></th>
                    <th><center>Acciones</center></th>
                  </tr>
                </thead>
                <tbody>
                  {series.map( (serie,index) =>{
                    return (
                      <tr key={serie.id}>
                        <td><center>{serie.id}</center></td>
                        <td><center>{serie.name}</center></td>
                        <td><center>{serie.release_date}</center></td>
                        <td><center>{serie.rating}</center></td>
                        <td><center>{serie.category}</center></td>
                        <td><center>
                        <Button variant="success" onClick={()=>mostrar(serie.id,index)}>Editar</Button>
                        <Button variant="danger" onClick={()=>eliminar(serie.id)}>Eliminar</Button>
                        </center></td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <hr />
              <h1>{titulo}</h1>
              <Form onSubmit={guardar}>
                <Form.Control type="hidden" value={id} />
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese Nombre:</Form.Label>
                  <Form.Control type="text" value={nombre} onChange={(e)=> setNombre(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese Rating:</Form.Label>
                  <Form.Control type="number" value={rating} onChange={(e)=> setRating(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Categoria:</Form.Label>
                  <Form.Control type="text" value={categoria} onChange={(e)=> setCategoria(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control type="date" value={fecha} onChange={(e)=> setFecha(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  GUARDAR
                </Button>
            </Form>
          </Container>
      </div>
    );
  
}
export default App;