import {renderWithPaperScope, PaperContainer, Path, Rectangle} from '@psychobolt/react-paperjs';
import React from 'react';

export function CanvasEditor() {
    return <div className="flex_container">
        <div className="flex_item">
            layer1<br/>
            layer2<br/>
            layer3<br/>
        </div>
        <PaperContainer className="flex_item">
            {renderWithPaperScope(paper => (
                <Rectangle
                    width={90}
                    height={60}
                    fillColor="green"
                    position={paper.view.center}
                />

            ))}
        </PaperContainer>
    </div>

}
