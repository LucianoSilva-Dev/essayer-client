import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'


export default function Loading() {
    return (
        <div className="fixed top-0 left-0 h-full w-full bg-white bg-opacity-50 z-50 flex items-center justify-center">

            <Grid
                size="60"
                speed="1.5"
                color="#4A90E2"
            />
        </div>
    );
}
