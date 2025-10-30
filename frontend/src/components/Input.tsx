export function Input({  placeholder,referance }: { placeholder: string; referance? : any }) {
    return <div>
        <input placeholder={placeholder} type="text" className="px-4 py-2 border m-2" ref={referance} />
    </div>
}