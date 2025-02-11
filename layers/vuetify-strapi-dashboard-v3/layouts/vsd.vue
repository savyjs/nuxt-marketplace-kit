<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
        v-model="drawer"
        location="start"
        :temporary="mobile"
    >
      <v-list style="display: flex;flex-wrap: wrap;">
        <v-list-item>
          <v-row>
            <v-col cols="4" align-self="center">
              <v-avatar end="">
                <v-img
                    max-width="100%"
                    contain
                    :src="systemLogo"
                />
              </v-avatar>
            </v-col>
            <v-col cols="8" class="pt-0 mt-0">
              <v-list-item>
                <v-list-item-title class="pt-5">
                  <small> {{ $t("vsd.control_panel", "User panel") }} </small>
                  <p><b>{{ singleTitle }}</b></p>
                </v-list-item-title>
              </v-list-item>
            </v-col>
          </v-row>

          <v-col cols="3" class="pt-0 mt-0">
            <v-hover>
              <nuxt-link to="/admin/system/profile/edit">
                <v-list-item-media size="45" v-if="defaultPhoto">
                  <v-img
                      contain
                      :src="defaultPhoto"
                  />
                </v-list-item-media>
              </nuxt-link>
            </v-hover>
          </v-col>
          <v-col cols="9" class="pt-0 mt-0">
            <v-list-item>
              <v-list-item-title>
                <p>{{ user?.role?.name || 'User' }}</p>
                <small>{{ $t('vsd.welcome', 'Welcome') }} {{ user?.username || '' }}</small>
              </v-list-item-title>
            </v-list-item>
          </v-col>
        </v-list-item>
      </v-list>
      <LayoutVsdMenu></LayoutVsdMenu>
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer"
                       @click="$router.push('/admin')">{{
          $t("vsd.dashboard", "Dashboard")
        }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <span class="text-center mx-2">
        <template v-for="item in navbarMenu">
          <component :is="item.component" v-if="item?.component"/>
        <v-menu
            v-else-if=" item?.items"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
        >
          <template v-slot:activator="{ on }">
          <v-btn
              fab
              icon
              :to="item?.to"
              :href="item?.link"
              @click="item?.onclick"
              :target="item?.target"
          >
          <v-icon>{{ item?.icon }}</v-icon>
          </v-btn>
          </template>
        <v-list>
         <v-list-item v-for="(subItem,i) in item?.items" :to="subItem?.link" :key="i">
           <v-list-item-title>{{ subItem?.title }}</v-list-item-title>
         </v-list-item>
        </v-list>
        </v-menu>
          <v-btn
              v-else
              fab
              icon
              :to="item?.link"
              :target="item?.target"
          >
          <v-icon>{{ item?.icon }}</v-icon>
          </v-btn>
          </template>
      </span>

      <LayoutVsdDarkmode v-if="darkmodeToggleBtn"/>
      <LayoutVsdNotifications v-if="showNotifications"/>
      <LayoutVsdSettings v-if="showSettings"/>
      <LayoutVsdAccount class="mx-2"/>
      <ui-vsd-snackbar />
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <slot/>
    </v-main>
    <v-footer app="" class="py-0" inset>
      <v-btn x-small outlined elevation="0" class="mb-1 mx-1 pa-1 mt-1 font-10">
        {{ footerTitle || 'VSD' }}
        {{ Version }}
      </v-btn>
    </v-footer>
  </v-layout>
</template>
<script setup lang="ts">


import {useDisplay} from 'vuetify'

const appConfig = useAppConfig();

const {mobile} = useDisplay()
const singleTitle = appConfig?.vsd?.title;
const systemLogo = appConfig?.vsd?.systemLogo || "/assets/img/vsd.png";

const showNotifications = useState('showNotifications', () => true);

// Drawer
const drawer = useState('drawer', () => true);
const showSettings = useState('showSettings', () => true);

const showUser = useState("showUser", () => true)
const defaultPhoto = useState("defaultPhoto", () => '')
const user = useUser()
const darkmodeToggleBtn = appConfig?.vsd?.darkmodeToggleBtn || true;

const navbarMenu = [];
const footerTitle = appConfig?.vsd?.footerTitle || 'VSD'
const Version = '0.7-Alpha-1.2'

// handling Page skeleton
const loading = useLoader();
loading.start('skeleton')
onMounted(() => {
  loading.stop('skeleton')
})

</script>