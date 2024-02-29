import React, { useState } from "react";
import { Text } from '@react-three/drei';

export const TextSection = ({ title, subtitle, ...props }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
        <group {...props}>
            {!!title && (
                <Text
                    color="white"
                    anchorX="left"
                    anchorY="bottom"
                    fontSize={0.52}
                    maxWidth={2.5}
                    lineHeight={1}
                >
                    {title}
                </Text>
            )}
            <Text
                color="white"
                anchorX={"left"}
                anchorY="top"
                fontSize={0.2}
                maxWidth={2.5}
            >
                {subtitle}
            </Text>
        </group>

    );
};