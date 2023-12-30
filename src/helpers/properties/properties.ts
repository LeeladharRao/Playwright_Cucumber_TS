import * as dotenv from 'dotenv'

export const initProperties = () => {
        dotenv.config({
            override: true,
            path: "src/helpers/properties/.props.env"
        })
}