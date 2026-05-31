async function base(input,onchunk,history=[]){
    try{
    const response = await fetch("http://localhost:8000/chat",{method:"POST",headers:{"Content-Type":"application/json",},body: JSON.stringify({message: input,history,})});
        if (!response.ok)
            {throw new Error(`HTTP ${response.status}`);}
        const reader=response.body.getReader();
        const decoder= new TextDecoder();
        let result=""
        while(true){
            const{done,value}=await reader.read()
            if(done)
                break;
            const chunk=decoder.decode(value);
            const lines=chunk.split("\n");
            for (let line of lines){
                if(line.startsWith("data: ")){
                    const text=line.replace("data: ","");
                    if (
                        text.startsWith("[Router]") ||
                        text.startsWith("[Researcher]") ||
                        text.startsWith("[Writer]") ||
                        text.startsWith("[Maths]") ||
                        text.startsWith("[Merger]") ||
                        text.startsWith("[Final]")
                    ) {
                        result +="\n"+text+"\n";
                    } else {
                        result += text;
                    }
                    if(onchunk)
                        {onchunk(result);}
                if (text === "[DONE]") {
                    break;
                }
                }
            }
        }
        return result;
    }catch(error){
        console.error(error);
        return null;
    }
}
export default base