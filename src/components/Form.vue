<template>

    <form 
        @submit.prevent="onSubmit"        
        :class="`form form--${mode}`"
        method="POST"         
        autocomplete="off">

            <p class="u-hidden">
                <label><input v-model="form.asdasdcakkkk2k2kk3" name="asdasdcakkkk2k2kk3" /></label>
            </p>

            <div v-if="flash.show"
                :class="`flash ${flash.modifier}`">
                <strong class="js-flash-heading">{{flash.heading}}</strong><br>
                <p class="js-flash-message" v-html="flash.message"></p>
            </div>

            <fieldset v-if="mode == 'subscribe'" class="form__fieldset">
                <p class="form__row form__row--stretch">  
                    <label class="form__label">Email</label>          
                    <input v-model="form.email" class="form__input form__input--full" type="email" name="email" required placeholder="Email" />
                </p>
                <p class="form__row">
                    <button class="form__input form__input--submit" type="submit">Subscribe</button>
                </p>
            </fieldset>

            <fieldset v-else class="form__fieldset">
                <p class="form__row"> 
                    <label class="form__label">Name</label>   
                    <input v-model="form.name" class="form__input form__input--full" type="text" name="name" required placeholder="Name" />
                </p>

                <p class="form__row form__row--stretch">  
                    <label class="form__label">Email</label>          
                    <input v-model="form.email" class="form__input form__input--full" type="email" name="email" required placeholder="Email" />
                </p>

                <p class="form__row">  
                    <label class="form__label">Message</label>            
                    <textarea v-model="form.message" class="form__input form__input--textarea form__input--full" name="message" placeholder="Message"></textarea>
                </p>     
                
                <p class="form__row">            
                    <label class="">    
                        <input v-model="form.subscribe" type="checkbox" name="subscribe" checked />&nbsp;
                        <span>Subscribe for occasional updates and useful digital tips.<br>
                            <a href="">We respect your privacy</a></span>
                    </label>
                </p>

                <p class="form__row">
                    <button class="form__input form__input--submit" type="submit">Subscribe</button>
                </p>
            </fieldset>

    </form>

</template>

<script setup lang="ts">

    import { reactive } from 'vue';

    const props = defineProps<{
        mode: string;
        salt: string;
    }>();

    const form = reactive({
        name: '',
        email: '',
        mode: props.mode,
        message: '',
        subscribe: true, 
        asdasdcakkkk2k2kk3: ''
    });

    const flash = reactive({
        show: false,
        heading: '',
        message: '',
        modifier: ''
    })

    const reset = () => {
        form.name = ''
        form.email = ''
        form.message = ''
        form.subscribe = true
    }

    const onSubmit = async () => {

        try {
            
            const response = await fetch('/.netlify/functions/emailOctopus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            console.log(data)

            if (!response.ok) {
                flash.show = true
                flash.heading = "Error"
                flash.message = "Submission failed." + data?.error + " Please try again later"                
                flash.modifier = "flash--500"
                throw new Error(data?.error || 'Submission failed');
            } else {
                flash.show = true
                flash.modifier = "flash--200"

                if(props.mode == 'contact'){
                    flash.heading = "Thank you for your enquiry"
                    flash.message = "We will contact you shortly."
                } else {
                    flash.heading = "Thank you for your subscription"
                    flash.message = "You can unsubscribe at any time by following the link in the emails."
                }

                reset()
            }

        } catch (err: any) {

            flash.show = true
            flash.heading = err.message 
            flash.message = "Submission failed. Please try again later or email us on <a href='mailto:desk@fffood.agency'>desk@fffood.agency</a>"                
            flash.modifier = "flash--500"

        } 
        
    };

</script>