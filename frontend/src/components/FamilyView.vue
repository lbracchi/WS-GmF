<template lang="pug">

div
  b-row.justify-content-center(:align-h='$store.getters.isMediumScreenWidth ? null : "between"')
    b-col(lg='6' md='8' cols='10')
      b-form-group
        b-input-group
          b-form-input(v-model='filter' type='search' placeholder='Type to search' size='sm')
          b-input-group-append
            b-button(:disabled='!filter' @click="filter = ''" size='sm') Clear
    b-col(md='auto' cols='10')
      b-pagination(v-model='currentPage' :total-rows='totalRows' :per-page='perPage' align='fill' size='sm')

    b-col(md='12' cols='10')  
      b-table(show-empty striped='striped' hover='hover' :fields='tableFields' :items='verifiedFamilyList' :current-page='currentPage' :per-page='perPage' :filter='filter' :filter-included-fields='filterOn' :sort-by.sync='sortBy' :sort-desc.sync='sortDesc' :sort-direction='sortDirection')
        template(#cell(lastPackDate)='{ item }')
          p {{ packsNearestDeliveryDate(item.packs) }}
        template(#cell(plannedPackDate)='{ item }')
          p {{ packsPlannedDeliveryDate(item.packs) }}
        template(#cell(select)='{ item }')
          b-button.color3(@click='select(item)' size='sm') Select
        template(#empty='scope')
          h4.text-center There are no records to show
        template(#emptyfiltered='scope')
          h4.text-center There are no records matching your request
</template>

<script lang="ts">
import Vue from "vue";
import eventbus from "../eventbus";
import dates from "../misc/dates";
import api from "../api/family";
import { AxiosError, AxiosResponse } from "axios";

import { Address, Family, Pack } from "../types/types";
import { FamilyViewComponent } from "../types/componentTypes";

export default Vue.extend({
  name: "FamilyView",
  data: (): FamilyViewComponent => {
    return {
      familyList: new Array<Family>(),
      tableFields: [
        {
          key: "name",
          label: "Family name",
          sortable: true,
        },
        {
          key: "phoneNumber",
          label: "Phone Number",
          sortable: false,
        },
        {
          key: "components",
          label: "Components",
          sortable: true,
        },
        {
          key: "address",
          label: "Address",
          sortable: false,
          formatter: (addr: Address) => {
            return addr.street + " " + addr.civicNumber + ", " + addr.city;
          },
        },
        {
          key: "lastPackDate",
          label: "Last delivery",
          sortable: true,
        },
        {
          key: "plannedPackDate",
          label: "Planned delivery",
          sortable: true,
        },
        {
          key: "select",
          label: "",
          sortable: false,
        },
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filterOn: ["addres", "name"],
      filter: "",
    };
  },
  computed: {
    verifiedFamilyList() {
      return this.familyList.filter((f) => f.status == "verified");
    },
  },
  created() {
    eventbus.$emit("startLoading", "Loading families");
    api
      .familyWithPacksList({ filter: { "family.status": "verified" } })
      .then((r: AxiosResponse): void => {
        this.familyList = r.data as Family[];
        this.totalRows = (r.data as Family[]).length;
      })
      .catch((e: AxiosError): void => {
        console.log(e);
        eventbus.$emit(
          "errorMessage",
          "Family list",
          "Unable to retrieve families data."
        );
      })
      .then(() => eventbus.$emit("stopLoading"));
  },
  methods: {
    packsNearestDeliveryDate(packs: Pack[]) {
      const deliveryDates = packs
        .filter((p) => p.status == "delivered")
        .map((p) => p.deliveryDate);
      if (deliveryDates.length)
        return dates.formatDate(dates.getMaxDate(deliveryDates));
      return "";
    },
    packsPlannedDeliveryDate(packs: Pack[]) {
      const deliveryDates = packs
        .filter((p) => p.status == "planned delivery")
        .map((p) => p.deliveryDate);
      if (deliveryDates.length)
        return dates.formatDate(dates.getMinDate(deliveryDates));
      return "";
    },
    select(family: Family): void {
      this.$emit("select", family);
    },
  },
});
</script>

<style scoped lang="scss"></style>
