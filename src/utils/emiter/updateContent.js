/**
 * Обновляет контент в шапку главного компонента
 *
 * Обязательно
 * 1. css: 
 * .isHook { display: none; }
 *
 * 2. html - ref <router-view ref="rView"></router-view>
 * 3. html - hook
 
  <div class="isHook">
    <div ref="isHook__Name" class="blue--text">
      / {{$t('pagesTitle.referenceBook')}} / {{$t('pagesTitle.referenceBookUsers')}}
    </div>
  </div>

 <div class="isHook">
  <div ref="isHook__Actions">
    {{count}}
  </div>
 </div>
 * 
 * */

export const EmitUpdateContent = {
  watch: {
    "$route": function(){
      if (!this.init)
        this.$nextTick(()=>{
          this.__reloadHook()
        })
    }
  },
  mounted: function(){
    if (!this.init)
      this.__reloadHook()
  },
  updated: function(){
    if (!this.init)
      this.__reloadHook()
  },
  methods: {
    __reloadHook: function(refs = this.$refs.content.$refs){
      if ('rView' in refs) {
        if (refs.rView){
          this.__reloadHook(refs.rView.$refs)
        }else{
          this.__insertHook(refs)
        }
      }else{
        this.__insertHook(refs)
      }
    },
    __insertHook: function(refs){
      if (Object.keys(refs).length > 0){
        var toolbarRefs = this.$refs.toolbar.$refs
        toolbarRefs.isHook__Name.innerHTML = ""
        toolbarRefs.isHook__Name.appendChild(refs.isHook__Name)
        toolbarRefs.isHook__Actions.innerHTML = ""
        toolbarRefs.isHook__Actions.appendChild(refs.isHook__Actions)
      }
    }
  }
}
