<template>

    <div class="calculator">

        <div class="tabs">
            <nav class="section section--mid">
                <div class="section__inner section__inner--slim section__inner--no-bottom">
                    <div class="tabs__menu" role="tablist" aria-label="Calculator Tabs">
                        <a 
                            id="tab-quote"
                            href="#quote"
                            role="tab"
                            aria-controls="panel-quote"
                            :aria-selected="currentTab === 'quote'"
                            :tabindex="currentTab === 'quote' ? '0' : '-1'"
                            class="tabs__menu__link"
                            :class="{ 'tabs__menu__link--selected': currentTab === 'quote' }"
                            @click.prevent="setTab('quote')">Quote</a>
                        <a 
                            id="tab-rate-card"
                            href="#rate-card"
                            role="tab"
                            aria-controls="panel-rate-card"
                            :aria-selected="currentTab === 'rate-card'"
                            :tabindex="currentTab === 'rate-card' ? '0' : '-1'"
                            class="tabs__menu__link"
                            :class="{ 'tabs__menu__link--selected': currentTab === 'rate-card' }"
                            @click.prevent="setTab('rate-card')">Rate Card</a>
                    </div>
                </div>
            </nav>
            <div class="tabs__tabs">
                <div 
                    id="quote" 
                    class="tabs__tabs__tab"                        
                    role="tabpanel"
                    :hidden="currentTab !== 'quote'"
                    aria-labelledby="tab-quote">

                    <section class="section section--fade">
                        <div class="section__inner grid grid--halves">	

                            <div class="section__info">
                                <p><strong>{{ slide.heading }}</strong></p>
                                <h1>{{ slide.headline }}</h1>
                                <p v-html="slide.description"></p>                    
                            </div>

                            <div class="well well--no-pad bill">

                                <table class="table bill__header">
                                    <thead>
                                        <tr>
                                            <td class="table__cell table__cell--center table__cell--slim"><span class="round round--disabled"><i class="fa-solid fa-check"></i></span></td>
                                            <th>Task</th>
                                            <th class="table__cell table__cell--right">Price</th>                                
                                        </tr>
                                    </thead>  
                                </table>
                                <div class="bill__scroll">
                                    <table class="table">
                                        <tbody>
                                            <tr v-for="(item, i) in basket">
                                                <td class="table__cell table__cell--center table__cell--slim">
                                                    
                                                    <a v-if="!slides[item].required" class="round" @click.prevent="remove(i)" href="#">
                                                        <i class="fa-solid fa-minus"></i></a>
                                                    <span v-else class="round round--green">
                                                        <i class="fa-solid fa-check"></i></span>
                                                    
                                                </td>
                                                <td>{{ slides[item].label }}</td>
                                                <td class="table__cell table__cell--right">{{ formatCurrency(slides[item].price) }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="bill__footer">
                                    <table class="table">
                                        <tfoot>
                                            <tr>                                                
                                                <td colspan="2"><small>
                                    <em>Prices do not include VAT</em></small></td>
                                                <td class="table__cell table__cell--right calculator__total">{{ formatCurrency(total) }}</td>                        
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                        </div> <!-- /.section__inner -->
                    </section> <!-- /.section -->         

                    <section class="section section--dark">
                        <div class="section__inner section__inner--slim">	

                            <div class="calculator__action">
                                <div class="calculator__nav">
                                    <a  class="button button--green" 
                                        :class="{ 'button--disabled': added }"
                                        href="#" 
                                        @click.prevent="add(slide.cursor)">
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


                </div> <!-- /#quote --> 
                <div 
                    id="rate-card" 
                    class="tabs__tabs__tab"
                    role="tabpanel"
                    :hidden="currentTab !== 'rate-card'"
                    aria-labelledby="tab-rate-card">
                        <section class="section section--fade">
                            <div class="section__inner">
                                <h1>Rate Card</h1>
                            </div>
                        </section>
                </div> <!-- /.tabs__tabs__tab --> 
            </div> <!-- /.tabs__tabs -->
        </div> <!-- /.tabs -->

    </div> <!-- /.calculator -->

</template>

<script setup lang="ts">

    import { reactive, ref } from 'vue'
    import slides from '../data/slides.json' 

    const cursor = ref(0)
    const total = ref(0)

    const p_modifier = ref('button--disabled');
    const n_modifier = ref('');
    const added = ref(false)
 
    const slide = reactive({
        cursor: 0,
        heading: "",
        description: "",
        headline: "",
        price: 0,
        added: false
    })

    const basket = reactive([0])  
    
    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
        }).format(value)
    }

    function add(i: number){
        
        if(!slides[i].added){
            
            basket.push(i)
            slides[i].added = true
            added.value = true

            getTotal()
        }

    }

    function remove(i: number){
        added.value = slides[basket[i]].added = false        
        basket.splice(i, 1);   
        getTotal()     
    }

    function getTotal(){
        total.value = 0
        basket.forEach(item => {
            total.value += slides[item].price
        })
    }

    type s = {
        label: string;
        description: string;
        headline: string,
        price: number;
        added: boolean;
        required: boolean;
    };

    function nextSlide(s: s){
        slide.cursor = cursor.value
        slide.heading = s.label
        slide.description = s.description
        slide.headline = s.headline
        slide.price = s.price
        slide.added = s.added

        added.value = slide.added
    }

    function navigate(next: number){

        cursor.value += next

        n_modifier.value = ""
        p_modifier.value = ""

        if (cursor.value >= slides.length - 1) {
            n_modifier.value = "button--disabled"
            cursor.value = slides.length - 1
        }

        if (cursor.value <= 0) {
            p_modifier.value = "button--disabled"
            cursor.value = 0
        } 
        
        nextSlide(slides[cursor.value])
    
    }

    /////

    nextSlide(slides[0])
    getTotal()

    /////

    const currentTab = ref('quote')

    function setTab(tab: string) {
        currentTab.value = tab
    }
    
</script>