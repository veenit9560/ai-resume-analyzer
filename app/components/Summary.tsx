import React from 'react';
import ScoreGauge from "../components/ScoreGauge";
const Summary = ({feedback}:{feedback:Feedback} ) => {
    return(
        <div className="bg-white rounded-">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge  score={feedback.overallScore}/>


            </div>
        </div>
    )
}
export default Summary;