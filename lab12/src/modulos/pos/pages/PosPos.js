import React from 'react';
import PosHeader from '../componentes/PosHeader';
import PosCategorias from '../componentes/PosCategorias';
import PosMesas from '../componentes/PosMesas';
import PosPlatos from '../componentes/PosPlatos';
import PosBoleta from '../componentes/PosBoleta';

const PosPos = () => {
	const mesaSeleccionada ={id:'1',nro:'1'};
	return (
		<>
			<PosHeader />
			<main className="pos-container">
				<PosCategorias />
				<section className="tabla">
					<PosMesas />
					<div className="pedido">
						<PosPlatos />
						<PosBoleta objMesa={mesaSeleccionada}/>
					</div>
				</section>
			</main>
		</>
	);
};

export default PosPos;
