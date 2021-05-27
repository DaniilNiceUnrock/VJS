import skillAddLine  from "./skillAddLine"

export default {
    title: "skillAddLine",
    components: {skillAddLine}
}

export const defaultViev = () => ({
    components: {skillAddLine},
    template: `
        <skill-add-line />
  `
})