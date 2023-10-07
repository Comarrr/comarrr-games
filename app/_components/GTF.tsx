'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { log } from "console"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"


interface GTFProps {
	translations : {
		fra: {
			common: string
		}
	}
	capital: string,
	flags : {
		svg: string,
	}

}

const GTF = ({ setIsAnswerCorrect } : any) => {
	
	const [countriesData, setCountriesData] = useState<GTFProps[]>([])
	const [flagsData, setFlagsData] = useState<string[]>([])
	const [namesData, setNamesData] = useState<string[]>([])
	const [capitalsData, setCapitalsData] = useState<string[]>([])
	const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(0);

	const [userInput, setUserInput] = useState<string>("");

	const [hint, setHint] = useState<boolean>(false);
	const [name, setName] = useState<boolean>(false);


	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then((res) => {
				setCountriesData(res.data)
				const flags = res.data.map((country: GTFProps) => country.flags.svg)
				const names = res.data.map((country: GTFProps) => country.translations.fra.common)
				const capitals = res.data.map((country: GTFProps) => country.capital)

				const { shuffledFlags, shuffledNames, shuffledCapitals} = shuffleArrays(flags, names, capitals);

				setFlagsData(shuffledFlags);
				setNamesData(shuffledNames);
				setCapitalsData(shuffledCapitals);

			})
	}, [])


	const shuffleArrays = (flags: string[], names: string[], capitals: string[]) => {
		const shuffledFlags = [...flags];
		const shuffledNames = [...names];
		const shuffledCapitals = [...capitals];		for (let i = shuffledFlags.length - 1; i > 0; i--) {
		  const j = Math.floor(Math.random() * (i + 1));
		  [shuffledFlags[i], shuffledFlags[j]] = [shuffledFlags[j], shuffledFlags[i]];
		  [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
		  [shuffledCapitals[i], shuffledCapitals[j]] = [shuffledCapitals[j], shuffledCapitals[i]];
		}
		return { shuffledFlags, shuffledNames, shuffledCapitals };
	  }

	  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUserInput(event.target.value);
	  }

	  const checkAnswer = () => {
		const correctAnswer = namesData[currentFlagIndex].toLowerCase();
    	const userAnswer = userInput.toLowerCase();

		if (userAnswer === correctAnswer) {
		  setIsAnswerCorrect(true);
		  setTimeout(() => {
			  setCurrentFlagIndex(currentFlagIndex + 1);
			  setUserInput('')
			  setHint(false)
			  setName(false)
			  setIsAnswerCorrect();
		  }, 1000);
		} else {
			setIsAnswerCorrect(false);
			setTimeout(() => {
				setHint(false)
				setName(false)
				setUserInput('')
				setIsAnswerCorrect();
			}, 1000)
		}
	  }

	return (
		<div className="">
			<p className="text-center text-lg mt-9">
				{
					name ? 
						`Reponse : ${namesData[currentFlagIndex]}`
						:
						hint ?
							`Indice : ${capitalsData[currentFlagIndex]}`
							:
							`. `
				}
			</p>
			<div className="relative left-1/2 -translate-x-1/2 flex flex-col w-fit px-16 ">

				{
					flagsData[currentFlagIndex] && <Image className="h-auto border border-2 border-black mt-3" src={flagsData[currentFlagIndex]} alt={namesData[currentFlagIndex]} width={500} height={300}/>
				}
				<Input type="text" className="" value={userInput} onChange={handleInputChange} />
				<Button className="" onClick={checkAnswer}>Valider</Button>
			</div>
			<div className="flex justify-center mt-5 gap-8">
				<Button onClick={() => setHint(!hint)}>Indice</Button>
				<Button onClick={() => setName(!name)}>Reponse</Button>
			</div>
		</div>
	)
}

export default GTF