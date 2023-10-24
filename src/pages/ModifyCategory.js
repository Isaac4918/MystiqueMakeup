import backButton from '../components/assets/back.png'

export function BackAccount(){
    return(
        <div className="backAccount"> 
            <a href="/"><img src={backButton} alt=""/></a>
        </div>
    )
}