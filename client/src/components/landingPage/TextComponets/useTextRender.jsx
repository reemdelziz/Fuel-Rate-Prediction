import { useMemo } from "react";
import { Vector3} from 'three';

export const useTextRender = (curvePoints ) => {
    const textSections = useMemo(() => [
        {
            cameraRailDist: -1,
            position: new Vector3(
                curvePoints[1].x - 3,
                curvePoints[1].y,
                curvePoints[1].z
            ),
            title: "Welcome to Fuel Predictor,",
            subtitle: `
Have a seat and enjoy the ride!`,
        },
        {
            cameraRailDist: 2,
            position: new Vector3(
                curvePoints[2].x + 2,
                curvePoints[2].y,
                curvePoints[2].z
            ),
            title: "Services",
            subtitle: `Ready to lock in a fuel price estimate?
Unlock free, personalized fuel price predictions tailored just for you!`,
        },
        {
            cameraRailDist: -1,
            position: new Vector3(
                curvePoints[3].x - 3,
                curvePoints[3].y,
                curvePoints[3].z
            ),
            title: "Drive Smarter!",
            subtitle: `With personalized fuel price predictions, start planning your savings strategy now!`,
        },
        {
            cameraRailDist: 2,
            position: new Vector3(
                curvePoints[4].x + 3.5,
                curvePoints[4].y,
                curvePoints[4].z - 12
            ),
            title: "Stay ahead of the curve!",
            subtitle: `Keep scrolling to get started on your free estimates`,
        },
    ], [curvePoints]);

    return textSections;
};