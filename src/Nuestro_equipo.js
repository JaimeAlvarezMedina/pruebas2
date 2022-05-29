import './App.css';
import React from 'react';
function Perfil(props) {
    localStorage.setItem("tipo", props.id);
    localStorage.setItem("nombre_usuario", props.algo);
    if (Boolean(localStorage.getItem("usuario")) == true) {
        if (props.id == "cliente") {
            return (
                <a href="/" id='cerrar_sesion' >Logout</a>
            )
        }
        if (props.id == "admin") {
            return (
                <div>

                    <a href="/anadir_admin" >Añadir administrador</a>
                    <a href="/" id='cerrar_sesion'>Logout</a>
                </div>
            )
        }
        if (props.id != "admin" && props.id != "cliente") {
            return (
                <a href="/login" >Login</a>
            )
        }
    }
    else {
        return (
            <a href="/login" >Login</a>
        )
    }
}
function Mi_perfil(props) {
    if (props.id == "cliente") {
        return (
            <a href="/Perfil" id="mi_perfil">Mi perfil</a>
        )
    }
}
class Foro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {articulo: [], categoria: [], imagen_prueba: '', datos_usuario: [], tipo: "" };
        this.coger_id = this.pasar_pagina.bind(this);
        this.crear_post = this.ir_crear_post.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.funcion = this.añadir_funcion.bind(this);
        this.f = this.funciones.bind(this);
        this.coger_usuario = this.coger_datos_usuario.bind(this);
        this.perfil = this.perfil_usuario.bind(this);
        this.mi_perfil = this.mi_perfil_dentro.bind(this);
    }
    openNav() {
        document.getElementById("mySidemenu").style.width = "250px";
        document.getElementById("btn").style.height = "0px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("btn_dentro").style.opacity = 0;
        document.getElementById("btn_dentro").style.display = "none";
        document.getElementById("container").style.marginTop = "10px";
    }
    closeNav() {
        document.getElementById("container").style.marginTop = "70px";
        document.getElementById("mySidemenu").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("btn").style.height = "50px";
        document.getElementById("btn_dentro").style.display = "block";
        setTimeout(function () {

            document.getElementById("btn_dentro").style.opacity = 1;
        }, 300);
    }
    pasar_pagina({ currentTarget }) {
        localStorage.setItem('id_articulo', currentTarget.id);
        window.location.href = "/pagina_articulo";
    }
    ir_crear_post() {
        window.location.href = "/crear_post";
    }
    funciones() {
        localStorage.setItem("usuario", "");
        window.location.reload()
    }
    añadir_funcion() {
        if (localStorage.getItem("usuario") != "") {
            var elemento_cerrar = document.getElementById("cerrar_sesion");
            elemento_cerrar.onclick = this.f;
            if (localStorage.getItem("tipo") == "cliente") {
                var elemento_crear = document.getElementById("crear_post");
                elemento_crear.onclick = this.crear_post;
                var mi_perfil = document.getElementById("mi_perfil");
                mi_perfil.onclick = this.mi_perfil;
            }
        }
    }
    coger_datos_usuario() {
        var datos = new FormData();
        if (Boolean(localStorage.getItem("usuario")) == true) {
            datos.append("usuario", localStorage.getItem("usuario"));
        }
        else {
            datos.append("usuario", "");
        }
        fetch("http://159.223.172.191/consultar_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == 'vacio') {
                        this.setState({ datos_usuario: ["Nada"] });
                    }
                    else {
                        this.setState({ datos_usuario: result });
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    componentDidMount() {
        this.coger_usuario();
    }
    perfil_usuario({ currentTarget }) {
        window.location.href = "/Perfil";
        localStorage.setItem("Creador", currentTarget.id);
    }
    mi_perfil_dentro() {
        localStorage.setItem("Creador", localStorage.getItem("nombre_usuario"));
    }
    render() {
        return (
            <div className='dashboard' onMouseEnter={this.funcion}>
                <div id="mySidemenu" className="sidemenu">
                    <a href="#" className="cerrar" onClick={this.closeNav}>&times;</a>
                    <a href="/foro" >Home</a>
                    {this.state.datos_usuario.map((comentario) => <Mi_perfil id={comentario.Tipo} onClick={this.perfil} />)}
                    <a href="/" >Categorias</a>
                    <a href="/Nuestro_equipo">Nuestro equipo</a>
                    {this.state.datos_usuario.map((usuario) => <Perfil id={usuario.Tipo} algo={usuario.User} />)}
                </div>
                <div id="main">
                    <div className="btnclas fixed-top d-flex" id="btn">
                        <button className="btn-open" id="btn_dentro" onClick={this.openNav}>&#9776; </button>           
                    </div>
                    <div className='dashboard-app'>
                        <div className='dashboard-content'>
                            <div className='container' id='container'>
                                <div className='card '>
                                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-12 col-sm-8 col-lg-6">
                                                <div class="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay:" 0.2s", animationName:" fadeInUp"}}>
                                                    <h3>Nuestro Equipo</h3>
                                                    <p>Este es el equipo que a formado parte de nuestro proyecto</p>
                                                    <div class="line"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-sm-6 col-lg-3">
                                                <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
                                                    <div class="advisor_thumb"><img class="imagen_prueba" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                        <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
                                                    </div>
                                                    <div class="single_advisor_details_info">
                                                        <h6>Abel</h6>
                                                        <p class="designation">-</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-lg-3">
                                                <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.3s" style={{visibility: "visible", animationDelay: "0.3s", animationName: "fadeInUp"}}>
                                                    <div class="advisor_thumb"><img class="imagen_prueba" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                                                        <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
                                                    </div>
                                                    <div class="single_advisor_details_info">
                                                        <h6>Ruben</h6>
                                                        <p class="designation">-Interfaz grafica <br></br>-Perfil/editar perfil<br></br> -Nuestro equipo<br></br> -Pasarela de pago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-lg-3">
                                                <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.4s" style={{visibility: "visible", animationDelay: "0.5s", animationName: "fadeInUp"}}>
                                                    <div class="advisor_thumb"><img class="imagen_prueba" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                                                        <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
                                                    </div>
                                                    <div class="single_advisor_details_info">
                                                        <h6>Jaime</h6>
                                                        <p class="designation">-Funcionalidad <br></br>-Control de usuarios<br></br>-Foro <br></br> -Servidor</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-lg-3">
                                                <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.5s" style={{visibility: "visible", animationDelay: "0.5s", animationName: "fadeInUp"}}>
                                                    <div class="advisor_thumb"><img class="imagen_prueba" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                                                        <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
                                                    </div>
                                                    <div class="single_advisor_details_info">
                                                        <h6>Eloy</h6>
                                                        <p class="designation">Este ni lo a intentado</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Foro;