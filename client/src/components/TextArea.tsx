import { useRef } from "react";
import { Textarea } from "./ui/textarea";


interface TextAreaProps {
  val: string; 
  setVal: (value: string) => void;
  isLearning: boolean;
  placeholder?: string;
}
const TextArea: React.FC<TextAreaProps> = ({
  val,
  setVal,
  isLearning,
  placeholder,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);
  };

  return (
    <div className="h-full overflow-y-scroll rounded-lg border-border-hust border-2 hide-scrollbar">
      <Textarea
        className="bg-foreground-hust h-full text-justify text-copy-light leading-7 tracking-wider resize-none cursor-auto"
        placeholder={
          placeholder ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Etiam ut urna varius, fermentum nunc at, tincidunt arcu. Praesent "
        }
        value={val}
        onChange={handleChange}
        disabled={isLearning} 
        ref={textAreaRef} 
      />
    </div>
  );
};

export default TextArea;
