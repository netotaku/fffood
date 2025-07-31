<template>

    <div class="calculator">

        <section class="section section--lightest">
            <div class="section__inner">	

                <span class="calculator__cursor">{{cursor+1}}.</span>

                <h2>{{ slide.heading }}</h2>
                <p v-html="slide.description"></p>

                <div class="well">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th class="table__slim">Price</th>
                                <th class="table__slim"></th>
                            </tr>
                        </thead>   
                        <tbody>
                            <tr v-for="(item, i) in basket">
                                <td>{{ slides[item].label }}</td>
                                <td>£{{ slides[item].price }}</td>
                                <td class="table__slim table__actions">
                                    <a class="round" @click.prevent="remove(i)" href="#">
                                        <i class="fa-solid fa-minus"></i></a></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>                                                
                                <td>Total</td>
                                <td class="table__slim">£{{ total }}</td>                        
                                <td class="table__slim"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div> <!-- /.section__inner -->
        </section> <!-- /.section -->         

        <section class="section section--light">
            <div class="section__inner">	

                <div class="calculator__action">
                    <div class="calculator__nav">
                        <a class="button" href="#" @click.prevent="add(slide.cursor)">
                            <i class="fa-solid fa-plus"></i> Add</a>
                    </div>
                    <div class="calculator__nav">
                        <a class="button" href="#" @click.prevent="navigate(-1)"><i class="fa-solid fa-chevron-left"></i></a>&nbsp;
                        <a class="button" href="#" @click.prevent="navigate(1)"><i class="fa-solid fa-chevron-right"></i></a>
                    </div>
                </div>

            </div> <!-- /.section__inner -->
        </section> <!-- /.section --> 

    </div>
</template>

<script setup lang="ts">

    import { reactive, ref } from 'vue'

    const cursor = ref(0)
    const total = ref(0)

    const n_modifier = ref('');
    const p_modifier = ref('');

    function add(i: number){        
        basket.push(i)
        total.value = 0
        basket.forEach(item => {
            total.value += slides[item].price
        })
    }

    function remove(i: number){
        basket.splice(i, 1);
    }

    type s = {
        label: string;
        description: string;
        price: number;
    };

    function nextSlide(s: s){
        slide.cursor = cursor.value
        slide.heading = s.label
        slide.description = s.description
        slide.price = s.price
    }

    function navigate(next: number){

        cursor.value += next

        if(cursor.value >= slides.length){
            cursor.value--
        }
        
        if(cursor.value <= 0){
            cursor.value++
        }

        // console.log("cursor", cursor.value)

        nextSlide(slides[cursor.value])

    }

    const slide = reactive({
        cursor: 1,
        heading: "Discovery",
        description: 'We get to know your business, goals, and audience — then plan what you really need.',
        price: 850,
        added: true
    })

    const basket = reactive([0])

    const slides = [
        {    
            label: 'Discovery',
            price: 850,
            description: 'We get to know your business, goals, and audience — then plan what you really need.'
        },
        {   
            label: 'Branding',
            price: 600,
            description: 'Logo, colours and simple identity work to help you look consistent and considered.'
        },
        {   
            label: 'Website',
            price: 950,
            description: 'A clean, fast site with your brand and content — easy to update and built to last.'
        },
        {
            label: 'SEO',
            price: 400,
            description: 'We make sure your site can be found by local customers and search engines alike.'
        },
        {   
            label: 'Email',
            price: 300,
            description: 'Templates, tools and guidance for sending great-looking emails and newsletters.'
        },
        {   
            label: 'CRM',
            price: 500,
            description: 'We help you pick and set up the right customer database, with training included.'
        },
        {
            label: 'Content',
            price: 300,
            description: 'Social media graphics, planning templates and advice to help you post with purpose.'
        },
        {
            label: 'Workspace + Domain',
            price: 150,
            description: 'Get set up with professional email, domain, and cloud tools like Google Workspace.'
        },
        {
            label: 'Paid Media',
            price: 250,
            description: 'Simple social or search ad setup to help you get seen while staying in control of spend.'
        },
        {
            label: 'Training',
            price: 100,
            description: 'One-to-one or team sessions on content, websites, tools, or AI — tailored to you.'
        }
    ];


</script>

<style lang="scss" scoped>

    .round{
        background: red;
        color: white;
        padding: 3px 8px;
        border-radius: 50%;
        &:hover{
            background: #666;
        }
    }

    .calculator{
        &__action{
            display: flex;
            justify-content: space-between;
            line-height: 1;
        }
    }    

</style>