
const QuickStartTextComponent = ({title, text, id}) => {

    function collapseText(){
        const collapsible = document.getElementById(id);
        collapsible.style.display = collapsible.style.display === "block" ? "none" : "block";
    }

    return (
        <>  
            <div className="quick-start-section-container">
                <button className="quick-start-button" onClick={collapseText}>
                    {title}
                </button>
                <div id={id} className="quick-start-text-container">
                        <p className="quick-start-text">{text}</p> 
                </div>
            </div>
        </>
    )
}

export default QuickStartTextComponent;