// components/Tabs/Tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        Tabs: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        tabsTap(e) {
            const { id } = e.currentTarget.dataset;
            this.triggerEvent("tabsChange", { id })

        }
    }
})