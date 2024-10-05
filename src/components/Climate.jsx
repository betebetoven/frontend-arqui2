import React, { useState } from 'react';
import './Climate.css';

const Climate = () => {
    const [luminosity] = useState(55); // Estado de la luminosidad

    // Función para determinar la clase según la luminosidad
    const getLuminosityClass = () => {
        if (luminosity < 50) return 'low-light';
        if (luminosity < 150) return 'medium-light';
        return 'high-light';
    };

    // Renderizar un SVG basado en la luminosidad
    const renderSVG = () => {
        const svgStyle = {
            transition: 'transform 0.3s ease',
        };

        if (luminosity < 50) {
            return (
                <svg id="low-light-svg" style={svgStyle} width="100" height="100">
                    <circle cx="50" cy="50" r="40" fill="darkblue" />
                    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="16">Baja luz</text>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        from="1"
                        to="1.1"
                        dur="0.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </svg>
            );
        } else if (luminosity < 150) {
            return (
                <svg id="medium-light-svg" style={svgStyle} width="100" height="100">
                    <circle cx="50" cy="50" r="40" fill="lightblue" />
                    <text x="50" y="55" textAnchor="middle" fill="black" fontSize="16">Luz media</text>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        from="1"
                        to="1.1"
                        dur="0.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </svg>
            );
        } else {
            return (
                <svg id="high-light-svg" style={svgStyle} width="100" height="100">
                    <circle cx="50" cy="50" r="40" fill="yellow" />
                    <text x="50" y="55" textAnchor="middle" fill="black" fontSize="16">Alta luz</text>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        from="1"
                        to="1.1"
                        dur="0.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </svg>
            );
        }
    };

    return (
        <div className="climate-panel">
            <div className={`weather time-afternoon ${getLuminosityClass()}`}>
                <div className="content">
                    <h3>Luminosidad</h3>
                    <div className={`luminosity-display ${getLuminosityClass()}`}>
                        <div className="luminosity">{luminosity} lux</div>
                    </div>
                </div>
            </div>
            <div className="svg-container">
                {renderSVG()}
            </div>
        </div>
    );
};

export default Climate;
