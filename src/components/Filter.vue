<template>
  <div class="mb-3 px-3 py-3 py-sm-2 rounded-2 _dashboard-body">
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-xxl-auto"></div>
      <div class="col-12 col-xxl-auto">
        <form class="d-sm-inline-flex" @submit.prevent="$emit('klik', dat)">
          <div class="input-group input-group-sm me-1 mb-1 mb-sm-0">
            <span class="input-group-text">
              <i class="fa-fw fa fa-search"></i>
            </span>
            <input
              type="text"
              v-model="dat.search"
              class="form-control form-control-sm bg-light"
              placeholder="Search"
            />
          </div>
          <div class="input-group input-group-sm me-1 mb-1 mb-sm-0">
            <span class="input-group-text">
              <i class="fa-fw fa fa-sort"></i>
            </span>
            <select
              v-if="order"
              v-model="dat.order"
              class="form-select"
              name="sort"
              autocomplete="off"
            >
              <!-- <option value>--- Sort By ---</option> -->
              <option
                v-for="item in order"
                :value="item.id"
                :key="`co${item.id}`"
              >
                {{ item.name }}
              </option>
            </select>
            <select
              v-else
              v-model="dat.order"
              class="form-select"
              name="sort"
              autocomplete="off"
            >
              <!-- <option value>--- Sort By ---</option> -->
              <option value="createdAt">Created At</option>
            </select>
          </div>
          <div class="input-group input-group-sm me-1 mb-1 mb-sm-0">
            <span class="input-group-text">
              <i class="fa-fw fa fa-sort"></i>
            </span>
            <select
              v-model="dat.stream"
              class="form-select"
              name="order"
              autocomplete="off"
            >
              <option value disabled hidden>--- Order By ---</option>
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>
          <div class="input-group input-group-sm me-1 mb-1 mb-sm-0">
            <span class="input-group-text">
              <i class="fa-fw fa fa-sort"></i>
            </span>
            <select
              v-model="dat.max"
              class="form-select"
              name="max"
              autocomplete="off"
            >
              <option value disabled hidden>--- Max ---</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <div class="mt-3 mt-sm-0">
            <button type="submit" class="btn btn-sm btn-red _nowrap">
              <i class="fa-fw fa fa-filter"></i> Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      show: false,
      dat: {
        search: "",
        max: "",
        order: "createdAt",
        stream: "",
      },
    };
  },
};
</script>
