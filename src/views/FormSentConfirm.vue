<template>
    <div class="form-confirm">
        <div class="message">
            <h1 class="title title--big">Got it!</h1>
            <p>Thanks for getting in touch. I'll aim to get back to you within 24 hours.</p>
            <router-link to="/"><img src="@/assets/ui-icons/left-chevron.svg">Back</router-link>
        </div>
    </div>
</template>

<style lang="scss">

    .form-confirm {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: $palette-text-blue;
            font-size: 1.2em;
            width: fit-content;
            img {
                height: 36px;
                width: 36px;
            }
        }
    }
</style>