import css from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Logo.png";
import {UilShoppingBag,UilReceipt} from "@iconscout/react-unicons"
import { useStore } from "../store/store";
import  {useState,useEffect} from 'react';
 
export default function Header(){
	
	// State in the terminal 
	//const state = useStore((state) => state);
	//console.log(state);

	// Initaliser si oui ou non le client a passé une commande ?
	const [order, setOrder] = useState("");
	useEffect(() => {
		setOrder(localStorage.getItem("order"))
	  }, [])
	const items = useStore((state) => state.cart.pizzas.length);
	return (
		<header className= {css.header}>
			{/* logo site */}
			<div className={css.logo}> 
				<Image src={Logo} alt="" width={50} height={50}/>
				<span>Fudo</span>
			</div>

			{/* menu site */}
			<ul className={css.menu}> 
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li><Link href='/#menu'>Menu</Link></li>
				<li>Contact</li>
			</ul>

			{/* right site */}
			<div className={css.rightSide}> 
				<Link href='/cart'>
					<div className={css.cart}> 
						<UilShoppingBag size={40} color="#2E2E2E"/>
						<div className={css.badge}> 
							{items}
						</div>
					</div> 
				</Link>
				{ order && (
					<Link href={`/order/${order}`}>
						<div className={css.cart}> 
							<UilReceipt size={40} color="#2E2E2E"/>
							{ 	
								order != "" && 
								(<div className={css.badge}> 
									1
								</div>)
							}
						</div> 
					</Link>
				)}
				
			</div>
		</header>
	);
}

