<template>
  <div>
    <!-- Nav bar -->
    <nav
      class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand">BookStore</router-link>
        <ul class="nav flex-row float-right">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Store</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/view" class="nav-link">View Book</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link  to="/add" class="nav-link" 
              >Create Book</router-link
            >
          </li> -->
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
