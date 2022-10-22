import Layout from "../../components/Layout";
import { client , urlFor} from "../../lib/client";
import Image from "next/image";
import css from "../../styles/Pizza.module.css";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast , { Toaster } from "react-hot-toast";

export default function Pizza({pizza}){

	const [pizzaSize, setPizzaSize] = useState(1);
	const [pizzaQuantity, setPizzaQuantity] = useState(1);
	const src = urlFor(pizza.image).url();

	/** Handle Quantity of Pizza */
	const handleQuantity = (type) => {
		type === "inc" 
		? setPizzaQuantity((prev)=> prev +1)
		: pizzaQuantity===1
		? null
		: setPizzaQuantity((prev)=> prev - 1)
		
	}

	const addPizza = useStore((state) => state.addPizza); 
	const addToCart = () =>{
		addPizza({...pizza, 
			price : pizza.price[pizzaSize],
			quantity : pizzaQuantity,
			size : pizzaSize,
		});
		toast.success("Added to cart");
		console.log('Pizza added');
	}
	return (
		<Layout>
			<div className={css.container}>
				<div className={css.imageWrapper}>
					<Image 
						loader = {()=> src}
						src={src} alt=''
						objecFit="cover" 
						unoptimized
						layout="fill"/>
								
				</div>

				{/** rigth side */}
				<div className={css.right}>
					<span>{pizza.name}</span>
					<span>{pizza.details}</span>
					<span><span style={ {color : 'var(--themeRed)'}}>xfa</span> {pizza.price[pizzaSize]}</span>
					<div className={css.size}>
						<span>Size</span>
						<div className={css.sizeVaraints}>
							<div onClick={()=> setPizzaSize(0)}
								className={pizzaSize === 0 ? css.selected : ""}>
								Small
							</div>
							<div onClick={()=> setPizzaSize(1)}
								className={pizzaSize === 1 ? css.selected : ""}>
								Medium
							</div>
							<div onClick={()=> setPizzaSize(2)}
								className={pizzaSize === 2 ? css.selected : ""}>
								Large
							</div>
						</div>		
					</div>
				
					{/** Quantity counter */}
					<div className={css.quantity}>
						<span>Quantity</span>
						<div className={css.counter}>
							<Image 
								src={LeftArrow} 
								height={15}
								width={15}
								alt=''
								objecFit="contain" 
								onClick={()=>handleQuantity("dec")}
							/>
							<span>{ pizzaQuantity } </span>
							<Image 
								src={RightArrow} 
								height={15}
								width={15}
								alt=''
								objecFit="contain" 
								onClick={()=>handleQuantity("inc")}
							/>
						</div>
					</div>
					<div onClick={addToCart} className={`btn ${css.btn}`}>
						Add to cart
					</div>	
					<Toaster />
				</div>
			</div>
		</Layout>
	)

}

export async function getStaticPaths(){
	const paths = await client.fetch(
	`*[_type=="pizza" && defined(slug.current)][].slug.current`
	);

	return {
		paths : paths.map((slug)=>({params:{slug}})),
		fallback : 'blocking'
	}
}

export async function getStaticProps(context){
	const { slug = "" } = context.params;
	const pizza = await client.fetch(
		`*[_type=="pizza" && slug.current == '${slug}'][0]`
	);
	return {
		props : {
			pizza,
		},
	};
}