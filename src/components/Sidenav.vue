<template>

<div class="container">
    <div class="row">
       
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div class="position-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                            Link 1
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            Link 2
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            Link 3
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            Link 4
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <!-- Your page content goes here -->
        </main>
    </div>
</div>

</template>

<script>
export default {
    data () {
        

        return {}
    }
}
</script>

<style scoped>
/* Custom styles for the sidebar */
#sidebar {
    min-width: 150px;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    padding-top: 20px;
    padding-left: 0;
    padding-right: 0;
    background-color: #f8f9fa;
    border-right: 1px solid #dee2e6;
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto;
}

.sidebar a {
    padding: 10px;
    text-decoration: none;
    font-size: 1.1em;
    color: #000;
}

.sidebar a:hover {
    background-color: #e9ecef;
}

.nav-link.active {
    background-color: #e9ecef;
}

</style>