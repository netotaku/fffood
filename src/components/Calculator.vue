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

                        <a :class="`button button--bubblegum ${p_modifier}`" 
                            href="#" 
                            @click.prevent="navigate(-1)">
                                <i class="fa-solid fa-chevron-left"></i></a>
                        
                        &nbsp;

                        <a :class="`button button--bubblegum ${n_modifier}`" 
                            href="#" 
                            @click.prevent="navigate(1)">
                                <i class="fa-solid fa-chevron-right"></i></a>

                    </div>
                </div>

            </div> <!-- /.section__inner -->
        </section> <!-- /.section --> 

    </div>
</template>

<script setup lang="ts">

    import { reactive, ref } from 'vue'
    import slides from '../data/slides.json' 

    const cursor = ref(0)
    const total = ref(0)

    const p_modifier = ref('button--disabled');
    const n_modifier = ref('');
    
    const slide = reactive({
        cursor: 0,
        heading: "",
        description: "",
        price: 0,
        added: false
    })

    nextSlide(slides[0])

    const basket = reactive([0])    

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
        added: boolean;
        required: boolean;
    };

    function nextSlide(s: s){
        slide.cursor = cursor.value
        slide.heading = s.label
        slide.description = s.description
        slide.price = s.price
    }

    function navigate(next: number){

        cursor.value += next

        n_modifier.value = ""
        p_modifier.value = ""

        if(cursor.value >= slides.length){
            n_modifier.value = "button--disabled"
            cursor.value--
        }
        
        if(cursor.value <= 0){
            p_modifier.value = "button--disabled"
            cursor.value++
        }
        
        nextSlide(slides[cursor.value])

    }

</script>