<template>
    <div class="headline-component">
        <div class="container headline-container">
            <slot /> 
            <div class="title"> {{title}}</div>
            <div class="buttons">
                <button type="button" class="btn" @click="exitall">Выйти</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Панель администратора"
        }
    },
    methods: {
        exitall() {
            localStorage.removeItem('token');
            this.$router.push(`/`);
        }
    }
}
</script>




<style lang="postcss" scoped src="./headline.pcss"></style>
