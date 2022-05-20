import {Component} from 'react'
import Layout from './components/Layout';
import Productos from './components/Productos';
import Title from './components/Title';
import Navbar from './components/Navbar';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      productos: []
    }
}

  componentDidMount() {
    fetch('http://localhost:8000/productos')
      .then((response) => {
        return response.json()
      })
      .then((prod) => {
        this.setState({ productos: prod })
      })    
  } 

   render(){
     return(
       <div>
          <Navbar></Navbar>
         <Layout>
           <Title></Title>
           
           <Productos productos={this.state.productos}/>
         </Layout>
       </div>
     )
   }
}
export default App;