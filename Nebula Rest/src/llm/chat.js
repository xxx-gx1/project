/**
 *  chat 聊天
 * 
 */
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIMI_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions';
export const chat = async (
    messages,
    api_url=DEEPSEEK_CHAT_API_URL,
    api_key=import.meta.env.VITE_DEEPSEEK_API_KEY,
    model='deepseek-chat'
) => {
    try{
        const res = await fetch(api_url,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${api_key}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                model:model,
                messages,
                stream:false
            })
        })
        const data = await res.json();
        return{
            code: 200,
            data: {
                role: 'assistant',
                content: data.choices?.[0]?.message?.content || ''
            },
        }
    } catch(err){
        return {
            code: 0,
            msg: '请求失败'
        }
    }
}


export const kimiChat = async (messages) => {
    const res = await chat(
        messages,
        KIMI_CHAT_API_URL,
        import.meta.env.VITE_KIMI_API_KEY,
        'moonshot-v1-auto'
    )
    return res;
}
