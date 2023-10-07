import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { AlertTriangle, Info } from "lucide-react";


type TitleProps = {
	children: string
}

const Title = ({children}: TitleProps) => {
	return (
		<div className="flex justify-center items-center">
			<h1 className="text-4xl text-center mt-12">
				{children}
			</h1>
			<Popover>
				<PopoverTrigger asChild>
        			<Button className="bg-transparent border-none"><Info /></Button>
      			</PopoverTrigger>
      			<PopoverContent className="w-80 mt-4">
						<div className="space-y-2">
							<h4 className="font-medium leading-none flex items-center justify-center gap-2"><AlertTriangle />Warning !<AlertTriangle /></h4>
							<p className="text-sm text-muted-foreground text-center">
							Be careful to use accents and hyphens, otherwise the answer will be considered false.
							</p>
						</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default Title