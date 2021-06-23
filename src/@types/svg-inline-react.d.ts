declare module 'svg-inline-react' {

    export interface Props {
        src: string
    }
    
    InlineSVG as JSX.Element<Props>

    export default InlineSVG;
}