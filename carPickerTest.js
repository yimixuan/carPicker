// 品牌首字母导航条功能
    scrollToInitial($("#brandInitList>li"),$("#brandInitPop"));
    function scrollToInitial(navEle, popEle) {
        navEle.click(function () {
            var navEle = $(this).attr("data-id"),
                c = $(this).parent().siblings("dl").find("dt[data-initial=" + navEle + "]"),
                d = c.offset().top - 45;
            popEle.text(navEle).fadeIn(100),
                setTimeout(function () {
                        popEle.fadeOut(100)
                    },
                    200),
                $(document).scrollTop(d)
        })
    }
//选择品牌
    $('#carBrand').click(function () {
        getBrandList();
        $('#showBrand').show();
        $('.mask-bg').show();
    })
//返回按钮
    $('#close-brand').click(function () {
        closeAll();
    })
    $('#close-series').click(function () {
        $('#showSeries').hide();
        $('#showBrand').show();
    })
    $('#close-model').click(function () {
        $('#showModel').hide();
        $('#showSeries').show();
    })
//选择车系
    $('.brand-list').on('click','dd',function () {
        var brandid =$(this).data('brandid');
        getSeriesList(brandid)
    })
//选择车型
    $('.series-list').on('click','dd',function () {
        var seriesid =$(this).data('seriesid');
        getModelList(seriesid)
    })
//车型选择完成
    $('.model-list').on('click','dd',function () {
        var modelname=$(this).html();
        $('#showModel').hide();
        $('.mask-bg').hide();
        $('#carBrand').val($('#brandNameCN').val()+ $('#brandSeriesName').val()+modelname);//品牌车系车型选择完成
    })
    //初始化车辆品牌
    function getBrandList() {
        $.ajax({
            type:'POST',
            url:basePath + "/bdCustResuest/get/carBrand.shtml",
            success:function (rdata) {
                if(rdata.code=='0'){
                    var data=rdata.data;
                    if(data&&data.length!==0){
                        var brandStr='';
                        $.each(data,function (i,val) {
                            brandStr += '<dt data-initial="'+ val.indexPY+'">'+ val.indexPY+'</dt>';
                            $.each(val.datas,function (i,childVal) {
                                brandStr +='<dd data-brandid="'+childVal.id+'">'+childVal.value+'</dd>'
                            })
                        })
                        $('.brand-list').html(brandStr)
                    }else {
                        $('.brand-list').html('<dd>暂无品牌</dd>')
                    }
                }else {
                    infoTips('#errInfo','服务器异常，请稍后再试');
                }
            }
        })
    }

// 获得车系列表
    function getSeriesList(brandid) {
        $.ajax({
            type: "POST",
            url: basePath + "/bdCustResuest/get/carSeries.shtml",
            data: {
                brandId: brandid
            },
            success: function(rdata) {
                if(rdata.code=='0'){
                    var data=rdata.data;
                    if(data&&data.length!==0){
                        var str='';
                        $.each(data,function (i,val) {
                            str += '<dd data-seriesid="'+ val.id +'">'+ val.value + '</dd>';
                        })
                        $('.series-list').html(str)
                    }else {
                        $('.series-list').html('<dd>暂无车系</dd>')
                    }
                    $('#showBrand').hide();
                    $('#showSeries').show();

                }else {
                    infoTips('#errInfo','服务器异常，请稍后再试');
                }
            }
        })

    }
    // 获得车型列表
    function getModelList(seriesid) {
        $.ajax({
            type: "POST",
            url: basePath + "/bdCustResuest/get/carStyle.shtml",
            data: {
                seriesId: seriesid
            },
            success: function(rdata) {
                if(rdata.code=='0'){
                    var data=rdata.data;
                    if(data&&data.length!==0){
                        var str='';
                        $.each(data,function (i,val) {
                            str += '<dd data-modelid="'+ val.id +'">'+ val.value + '</dd>';
                        })
                        $('.model-list').html(str)
                    }else {
                        $('.model-list').html('<dd>暂无车型</dd>')
                    }
                    $('#showSeries').hide();
                    $('#showModel').show();

                }else {
                    infoTips('#errInfo','服务器异常，请稍后再试');
                }
            }
        })

    }
    function closeAll(){
        $(".panel-initial").hide();
        $(".mask-bg").hide()
    }
