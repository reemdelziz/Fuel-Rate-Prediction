
import { Text } from '@react-three/drei';
import { fadeOnBeforeCompileFlat } from "../../utils/fadeMaterial";
export const TextSection = ({ title, subtitle, ...props }) => {

    return (
        <group {...props}>
            {!!title && (
                <Text
                    color="black"
                    anchorX="left"
                    anchorY="bottom"
                    fontSize={0.52}
                    maxWidth={2.5}
                    lineHeight={1}
                >
                    {title}
                    <meshStandardMaterial 
                        onBeforeCompile={fadeOnBeforeCompileFlat}
                    />
                </Text>
            )}
            <Text
                color="black"
                anchorX={"left"}
                anchorY="top"
                fontSize={0.2}
                maxWidth={2.5}
            >
                {subtitle}
                <meshStandardMaterial 
                        color={"white"}
                        onBeforeCompile={fadeOnBeforeCompileFlat}
                />
            </Text>
        </group>

    );
};