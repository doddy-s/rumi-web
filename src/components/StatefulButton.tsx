export function StatefulButton(props: { buttonState: { css: string; text: string } }) {
    return (
        <>
            <button className={'w-full rounded-md p-2 border-2 ' + props.buttonState.css}
                    type="submit">
                {props.buttonState.text}
            </button>
        </>
    )
}