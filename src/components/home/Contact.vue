<template>
    <section id="contact" class="section section--light">
        <div class="section__content section__content--mid">
            <div class="reversed-flow">
                <h1 class="title title--big">Get in touch.</h1>
                <h2 class="title title--big">Let's make something great... </h2>
            </div>
            <form action="https://formspree.io/cameronnimmo@hotmail.co.uk" method="POST">
                <div class="name">
                    <label for="name">Name *</label>
                    <input v-validate="'required'" type="text" name="name" id="name" required>
                    <span>{{ errors.first('name') }}</span>
                </div>
                <div class="company">
                    <label for="company">Company / organisation</label>
                    <input type="text" name="company" id="company">
                </div>
                <div class="email">
                    <label for="email">Email address *</label>
                    <input v-validate="'required|email'" type="text" name="email" id="email" required>
                    <span>{{ errors.first('email') }}</span>
                </div>
                <div class="phone">
                    <label for="phone">Phone number</label>
                    <input type="tel" name="phone" id="phone">
                </div>
                <div class="subject">
                    <label for="subject">Subject *</label>
                    <input v-validate="'required'" type="text" name="subject" id="subject" required>
                    <span>{{ errors.first('subject') }}</span>
                </div>
                <div class="message">
                    <label for="message">Message *</label>
                    <textarea v-validate="'required'" name="message" id="message" required></textarea>
                    <span>{{ errors.first('message') }}</span>
                </div>
                <div class="submit-button">
                    <button :disabled="!valid" :class="{ disabled: !valid }">Send message</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

    export default {
        name: "Contact",
        computed: {
            valid() {
                return this.errors.all().length === 0
            }
        },
    }
</script>

<style lang="scss">
    #contact {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: $palette-background-light;
        .section-container {
            padding-top: 0;
        }
        .reversed-flow {
            display: flex;
            flex-direction: column-reverse;
            margin: 0px 0 10px 0;
            padding: 0 12px;
            .title {
                color: #385b6d;
                margin-bottom: 10px;
                &:nth-child(2) {
                    margin-bottom: 5px;
                    margin-top: 15px;
                }
                br {
                    line-height: 1.65;
                }
            }
        }
        form {
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            > div {
                flex-grow: 1;
                padding: 0 12px 5px 12px;
                box-sizing: border-box;
                > span {
                    float: left;
                    margin-top: 5px;
                    color: #980000;
                    font-size: 0.8em;
                }
            }
            label {
                text-align: left;
                display: block;
                margin-top: 20px;
                margin-bottom: 9px;
                color: #385b6d;
            }
            input, textarea {
                box-sizing: border-box;
                cursor: text;
                display: block;
                border-radius: 4px;
                border: 1px solid #bbb;
                /*box-shadow: 1px 1px 2px 0px #ccc inset;*/
                outline: none;
                width: 100%;
                margin: 0 auto;
                height: 40px;
                @extend %font-merri;
                letter-spacing: 1px;
                padding-left: 13px;
                padding-right: 13px;
                color: #282c34;
                line-height: 1.65;
                &:focus {
                    border: 1px solid #777;
                }
            }
            textarea {
                padding-top: 15px;
            }
            .name, .company, .email, .phone, .subject, .message {
                flex-basis: 100%;
            }
            @include mq("small-phone") {
                .name {
                    flex-basis: 30%;
                }
                .company {
                    flex-basis: 60%;
                }
                .email {
                    flex-basis: 40%;
                }
                .phone {
                    flex-basis: 30%;
                }
                .subject, .message {
                    flex-basis: 100%;
                }
            }
            textarea {
                min-height: 200px;
            }
            .submit-button {
                margin: 20px 10px;
                margin-left: auto;
                padding: 0;
                max-width: fit-content;
                button {
                    padding: 11px 25px;
                    font-size: 1.1em;
                    cursor: pointer;
                    &.disabled {
                        background-color: #ccc;
                        cursor: default;
                    }
                }
            }
        }
    }

</style>