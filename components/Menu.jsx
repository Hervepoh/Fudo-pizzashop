import css from "../styles/Menu.module.css";
import Image from "next/image";
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import {UilWhatsapp,UilPhone} from "@iconscout/react-unicons";
import {urlFor} from "../lib/client";
import Link from 'next/link';

export default function Menu({pizzas}){
	return (
		<div className= {css.container} id="menu">

			<div className= {css.heading}>
				<span>OUR MENU</span>
				<span>Menu that Always</span>
				<span>Make you Fall in Love</span>
			</div>

			{/* pizzas */}
			<div className= {css.menu}>
			{pizzas.map((pizza,id) =>{
				const src = urlFor(pizza.image).url();
				return(
					<div className={css.pizza} key={id}>
						<Link href={`./pizza/${pizza.slug.current}`}>
								<div className={css.imageWrapper}>
									<Image 
									loader = {()=> src}
									src={src} alt=''
									objecFit="cover" layout="fill"/>
								</div>
						</Link>	
								<span>{pizza.name}</span>
								<span><span style={ {color : 'var(--themeRed)'}}>xfa</span> {pizza.price[1]}</span>
						
						
					</div>
					
				)
			})}
			</div>
		</div>
	);
}

