<template>
  <div id="navigation-mobile" class="ps-panel--sidebar">
    <div class="ps-panel__header">
      <span class="cat_close">X</span>
      <h3>Categories</h3>
    </div>
    <div class="ps-panel__content">
      <ul class="menu--mobile">
        <div v-for="category in maincategory" :key="category.catId">
          <li
            :class="{
              'current-menu-item': true,
              'menu-item-has-children': true,
              'has-mega-menu': findDepthOfCatTree(category.catId) > 2
            }"
            class=""
            style="position: relative;"
          >
            <router-link
              :to="`/products/${category.catUrlKey}`"
              class="nav-link cat_link"
              ><span @click="refreshPageEvent(category)">{{
                category.catName
              }}</span></router-link
            >
            <template v-if="findDepthOfCatTree(category.catId) == 2">
              <span
                :id="`sub_menu_link_${category.catId}`"
                class="sub-toggle"
                @click="showSubCat(category.catId)"
              ></span>
            </template>

            <div :id="`sub_menu_${category.catId}`" class="mega-menu">
              <div class="mega-menu__column">
                <ul style="position: relative;">
                  <div v-for="cat in categoryList" :key="cat.catId">
                    <li style="position: relative;">
                      <template v-if="cat.parentId == category.catId">
                        <router-link
                          :to="`/products/${cat.catUrlKey}`"
                          class="nav-link cat_link"
                          ><span @click="refreshPageEvent(cat)">{{
                            cat.catName
                          }}</span></router-link
                        >
                        <template v-if="check3levelCat(cat.catId)">
                          <span
                            :id="`sub_menu_link_${cat.catId}`"
                            class="sub-toggle"
                            @click="showSubCat(cat.catId)"
                          ></span>
                        </template>

                        <ul
                          :id="`sub_menu_${cat.catId}`"
                          class="mega-menu__list"
                          style="display: none;position: relative;"
                        >
                          <div v-for="cat1 in categoryList" :key="cat1.catId">
                            <li v-if="cat.catId == cat1.parentId">
                              <router-link
                                :to="`/products/${cat1.catUrlKey}`"
                                class="nav-link cat_link"
                                ><span @click="refreshPageEvent(cat1)">{{
                                  cat1.catName
                                }}</span></router-link
                              >
                            </li>
                          </div>
                        </ul>
                      </template>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  props: ['maincategory', 'categoryList'],
  methods: {
    findDepthOfCatTree(catId) {
      let treelength = 0

      this.categoryList.forEach(function(item) {
        if (item.catId == catId) {
          const code = item.code
          const parts = code.split('#')
          treelength = parts.length
        }
      })

      return treelength
    },
    refreshPageEvent(cat) {
      this.url_key = cat.catUrlKey
      this.updateMetaDetails(cat)
      this.$emit('refreshPageEvent', this.url_key)
    },
    updateMetaDetails(item) {
      document.title = item.metaTitle ? item.metaTitle : 'Centreal Supermarket'
      $('meta[name=description]').attr('content', item.shortDescription)
      $('meta[name=keywords]').attr('content', item.metaKeywords)
    },
    check3levelCat(parantCat) {
      let isThirdLevel = false
      this.categoryList.forEach(function(item) {
        if (item.parentId == parantCat) {
          isThirdLevel = true
        }
      })
      return isThirdLevel
    },
    showSubCat(catId) {
      if ($(`#sub_menu_${catId}`).hasClass('show')) {
        $(`#sub_menu_${catId}`).removeClass('show')
        $(`#sub_menu_${catId}`).css({ display: 'none' })
        $(`#sub_menu_link_${catId}`).removeClass('active')
      } else {
        $(`#sub_menu_${catId}`).addClass('show')
        $(`#sub_menu_${catId}`).css({ display: 'block' })
        $(`#sub_menu_link_${catId}`).addClass('active')
      }
    }
  }
}
</script>
<style scoped>
.cat_close {
  top: 8px;
  right: 16px;
  position: absolute;
  z-index: 999;
  color: #fff;
  margin-right: 11px;
  margin-top: 7px;
  font-size: 17px;
  cursor: pointer;
}
.mega-menu {
  display: none;
}

.menu--mobile li .mega-menu:hover {
  display: block !important;
}
.mega-menu > * {
  float: none !important;
}

.mega-menu__list {
  max-width: none !important;
  max-height: none !important;
}
.menu--mobile .mega-menu__list > li {
  border-bottom: none !important;
}
</style>
