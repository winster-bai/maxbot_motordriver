

//% color="#2ed573" iconWidth=50 iconHeight=40
namespace Maxbot{

    //% block="motor [DRI] [NUM] speed:[DER]" blockType="command"
    //% DRI.shadow="dropdown" DRI.options="DRI" 
    //% NUM.shadow="range" NUM.params.min=0 NUM.params.max=1023 NUM.defl=512
    //% DER.shadow="dropdown" DER.options="DER" 
    export function speed(parameter: any, block: any){
        let driver = parameter.DRI.code
        let number = parameter.NUM.code
        let der = parameter.DER.code

        Generator.addImport("from pinpong.board import Board,Pin");
        // Generator.addInitHeader("init","Board().begin()");
        Generator.addInit("pin1","pin_ml_d = Pin(Pin.P5, Pin.OUT)");
        Generator.addInit("pin2","pin_ml_a = Pin(Pin.P8, Pin.PWM)");
        Generator.addInit("pin3","pin_mr_d = Pin(Pin.P6, Pin.OUT)");
        Generator.addInit("pin4","pin_mr_a = Pin(Pin.P16, Pin.PWM)")
        if (driver == "1"){
            Generator.addCode(`pin_ml_d.write_digital(${der})`)
            Generator.addCode(`pin_ml_a.write_analog(${number})`)
        }
        else if(driver == "2"){
            Generator.addCode(`pin_mr_d.write_digital(${der})`)
            Generator.addCode(`pin_mr_a.write_analog(${number})`)
        }
        else if(driver=="3") {
            Generator.addCode(`pin_ml_d.write_digital(${der})`)
            Generator.addCode(`pin_ml_a.write_analog(${number})`)
            Generator.addCode(`pin_mr_d.write_digital(${der})`)
            Generator.addCode(`pin_mr_a.write_analog(${number})`)
        }
        else{
            Generator.addErrorPrompt("Error: Maxbot，DRI，未知输入参数")
        }
    }

    //% block="motor [STOP] stop" blockType="command"
    //% STOP.shadow="dropdown" STOP.options="STOP" 
    export function stop(parameter: any, block: any){
        let stop = parameter.STOP.code

        Generator.addImport("from pinpong.board import Board,Pin");
        // Generator.addInitHeader("init","Board().begin()");
        Generator.addInit("pin1","pin_ml_d = Pin(Pin.P5, Pin.OUT)");
        Generator.addInit("pin2","pin_ml_a = Pin(Pin.P8, Pin.PWM)");
        Generator.addInit("pin3","pin_mr_d = Pin(Pin.P6, Pin.OUT)");
        Generator.addInit("pin4","pin_mr_a = Pin(Pin.P16, Pin.PWM)")

        if (stop == "1"){
            Generator.addCode(`pin_ml_a.write_analog(0)`)
        }
        else if(stop == "2"){
            Generator.addCode(`pin_mr_a.write_analog(0)`)
        }
        else if(stop=="3") {
            Generator.addCode(`pin_ml_a.write_analog(0)`)
            Generator.addCode(`pin_mr_a.write_analog(0)`)
        }
        else{
            Generator.addErrorPrompt("Error: Maxbot，STOP，未知输入参数")
        }
    }

}