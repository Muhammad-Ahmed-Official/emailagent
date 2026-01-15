import { useState } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';

type Props = {
    placeholder: string,
    label: string,
    onChnage: (values: {label: string, value: string}[]) => void,
    value: {label: string, value: string}[]
}

export default function TagInput({placeholder, label, onChnage, value}: Props) {
    const [input, setInput] = useState('');
    // const options = suggestions.map(suggestion => ({
    //     label: (
    //         <span className='flex items-center gap-2'>
    //             <Avatar name={suggestion} size='25' textSizeRatio={2} round={true} />
    //             {suggestion}
    //         </span>
    //     ), value: suggestion
    // }));

  return (
    <div className='border rounded-md  flex items-center'>
        <span className="ml-3 text-sm text-gray-500">{label}</span>
        <Select 
            onInputChange={setInput}
            value={value}
            onChange={(
                newValue: MultiValue<{ label: string; value: string }>,
                _actionMeta: ActionMeta<{ label: string; value: string }>
            ) => { onChnage([...newValue]) }}
            className='w-full flex-1'
            placeholder={placeholder}
            isMulti
            classNames={{
            control: () => {
                return '!border-none !outline-none !ring-0 !shadow-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none dark:bg-transparent'
            },
            multiValue: () => {
                return 'dark:!bg-gray-700'
            },
            multiValueLabel: () => {
                return 'dark:text-white dark:bg-gray-700 rounded-md'
            } 
            }}
        //     options={input ? options.concat({
        //     label: (
        //         <span className='flex items-center gap-2'>
        //             <Avatar name={input} size='25' textSizeRatio={2} round={true} />
        //             {input}
        //         </span>
        //     ), value: input
        // }) : options}
        />
    </div>
  )
}
