import css from "../styles/Footer.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import {UilFacebook,UilTwitter,UilYoutube,UilInstagram,UilWhatsapp} from "@iconscout/react-unicons"

export default function Footer(){
	return (
		<footer className={css.container}>
			<span>ALL RIGHT RESERVED</span>
		    {/* social side */}
			<div className={css.social}>
				<UilFacebook size={45} />
				<UilTwitter size={45} />
				<UilWhatsapp size={45} />
				<UilYoutube size={45} />
				<UilInstagram size={45} />
			</div>
			{/* logo side */}
			<div className={css.logo}> 
				<Image src={Logo} alt="" width={50} height={50}/>
				<span>Fudo</span>
			</div>
		</footer>

	)
}

