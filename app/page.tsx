'use client'


import { useEffect, useState } from "react";
import GTF from "./_components/GTF";
import Logo from "./_components/Logo";
import Title from "./_components/Title";


export default function Home() {

	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>();

	return (
	  <div className={`min-h-screen ${isAnswerCorrect ? 'bg-green-500' : isAnswerCorrect === false ? 'bg-red-500' : 'bg-gradient-to-b from-[#3DD0FF] to-[#377DCF]'}`}>
		<Logo />
		<Title>Guess The Flag</Title>
		<GTF setIsAnswerCorrect={setIsAnswerCorrect} />

   </div>
  )
}
