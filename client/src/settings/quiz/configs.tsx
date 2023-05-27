
export default {
    limitedQuestions: 5,
    limitedAlternatives: 5,
    questionCharacterLimit: 400,
    alternativeCharacterLimit: 140,
    options: {
        difficulty: [
            {
                label: "Iniciante",
                value: "beginner"
            },
            {
                label: "Intermediário",
                value: "intermediary"
            },
            {
                label: "Avançado",
                value: "avanced"
            },
            {
                label: "Nível Assembly",
                value: "assembly-level"
            },
        ],
        technology: [
            {
                label: (
                    <span>
                        <i className="bx bxl-javascript"></i>
                        Javascript
                    </span>
                ),
                value: "javascript"
            },
            {
                label: (
                    <span>
                        <i className="bx bxl-css3"></i>
                        CSS
                    </span>
                ),
                value: "css"
            },
            {
                label: (
                    <span>
                        <i className="bx bxl-html5"></i>
                        HTML
                    </span>
                ),
                value: "html"
            },
        ],
        questionTime: [
            {
                label: <span>120s</span>,
                value: "120",
            },
            {
                label: <span>90s</span>,
                value: "90",
            },
            {
                label: <span>60s</span>,
                value: "60",
            },
            {
                label: <span>30s</span>,
                value: "30",
            },
        ]
    },
}
