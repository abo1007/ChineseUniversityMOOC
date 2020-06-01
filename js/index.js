// JavaScript JQuery Document

$(document).ready(() => {
	
	// lession 框显示隐藏动画
	$('#li-lession').mouseover(() => {
		$('.lession').fadeIn(600);
		$('.lession').mousemove(() => {
			$('.lession').show()
		}).mouseleave(() => {
			$('.lession').fadeOut(400)
		})
	})
	$('.li-hide').mouseover(() => {
		$('.lession').fadeOut(400)
	})
	
	// 绑定 login窗口打开和关闭 事件
	$('#removeWindowSpan').click(() => {
		$('.login').hide();
	})
	$('#openWindowA').click(() => {
		$('.login').show();
	})
	$('#openWindowB').click(() => {
		$('.login').show();
	})
	
	// 轮播图
	var swipeQueue = ['#swipeli1','#swipeli2','#swipeli3'];
	var swipeSum = 0;
	var swipeBall = document.querySelectorAll('.swipeItem span')
	setInterval(() => {
		$('.swipeItem span').removeClass('spanActive');
		$(swipeQueue[swipeSum]).fadeOut(500)
		if(swipeSum == 2){
			$(swipeQueue[0]).fadeIn(500)
			swipeSum = 0;
		}else{
			$(swipeQueue[swipeSum+1]).fadeIn(500)
			swipeSum++;
		}
		swipeBall[swipeSum].className = 'spanActive';
	},4000)
	
	// 登录框验证 - 邮箱登录
	$('#login-email').blur(() => loginTest());
	$('#login-password').blur(() => loginTest());
	
	$('#login-btn').click(() => {
		if(IsLogin){
			loginAllow('#login-email','#login-password','#login-msg');
			IsLogin = false;
		}
	})
	
	// 登录框验证 - 手机号登录
	$('#login-phone').blur(() => loginPhoneTest());
	$('#login-phone-password').blur(() => loginPhoneTest());
	
	$('#login-phone-btn').click(() => {
		if(IsLoginPhone){
			loginAllow('#login-phone','#login-phone-password','#login-phone-msg')
			IsLoginPhone = false;
		}
	})
	
	// 注册验证
	$('#register-email').blur(() => RegisterTest());
	$('#register-password').blur(() => RegisterTest());
	$('#register-verify').blur(() => RegisterTest());
	
	$('#register-btn').click(() => {
		if(RegisterTest()) {
			loginAllow('#register-email','#register-password','#register-msg');
			$('#register-verify').val('');
		}
	})
})

// 登陆界面头部切换
var loginItem = document.querySelectorAll('.ite');
var loginWindows = document.querySelectorAll('.login .window .center');

function loginActive(index) {
	$('.window .top div').removeClass('itemActive');
	loginItem[index].className = 'itemActive';
	$('.login .window .center').hide();
	loginWindows[index].style.display = 'block';	
}

// 登录框验证 - 邮箱登录
var EmailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var PassWordReg = /^[a-z0-9A-Z]{6,20}$/;
var IsLogin = false;

function loginTest() {
	let IsEmail = EmailReg.test($('#login-email').val());
	let IsPass = PassWordReg.test($('#login-password').val())
	if(IsEmail && IsPass){
		$('#login-msg').text('验证通过').removeClass('warning').addClass('succeed')
		IsLogin = true;
	}else{
		$('#login-msg').text('请输入正确的邮箱和密码！').addClass('warning')
	}
}

// 登录框验证 - 手机号登录
var PhoneNumReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
var IsLoginPhone = false;

function loginPhoneTest() {
	let IsPhone = PhoneNumReg.test($('#login-phone').val());
	let IsPass = PassWordReg.test($('#login-phone-password').val());
	if(IsPhone && IsPass){
		$('#login-phone-msg').text('验证通过').removeClass('warning').addClass('succeed')
		IsLoginPhone = true;
	}else{
		$('#login-phone-msg').text('请输入正确的手机号和密码！').addClass('warning')
	}
}

// 注册验证
var IsRegisterEmail = false;
var IsRegisterPassword = false;
var IsRegisterVerify = false;
var verifyReg = /^[0-9]{4}$/;

function RegisterTest() {
	if(RegisterEmailTest() === false || RegisterPasswordTest() === false){
		$('#register-msg').text('请输入正确的邮箱地址和密码！').addClass('warning');
		return false;
	}else if(RegisterVerifyTest() === false){
		$('#register-msg').text('请输入正确的4位验证码！').addClass('warning');
		return false;
	}else if(RegisterEmailTest() && RegisterPasswordTest() && RegisterVerifyTest()){
		$('#register-msg').text('验证通过').removeClass('warning').addClass('succeed');
		return true;
	}
}
function RegisterEmailTest() {
	let IsEmail = EmailReg.test($('#register-email').val());
	return IsEmail;
}
function RegisterPasswordTest() {
	let IsPass = PassWordReg.test($('#register-password').val());
	return IsPass;
}
function RegisterVerifyTest() {
	let IsVer = verifyReg.test($('#register-verify').val());
	return IsVer ? true:false;
}

// 登录注册 成功方法
function loginAllow(input1,input2,loginMsg) {
	alert('登陆成功！')
	$('.login').hide();
	$(input1).val('');
	$(input2).val('');
	$(loginMsg).removeClass('succeed').html('使用<a>网易账号管家</a>，全面保护您的账号');
}