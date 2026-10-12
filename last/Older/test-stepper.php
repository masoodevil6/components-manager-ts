
<link href="./bootstrap.css" rel="stylesheet" type="text/css">

<section class="m-2" id="stepper"></section>


<script src="./html5-qrcode.min.js"></script>
<script src="./qrcode.js"></script>
<script src="./jalali.js"></script>
<script src="./highcharts.js"></script>
<script src="./components.js"></script>
<script src="./tools.js"></script>

<script src="./Stepper.js"></script>

<script>

    tools_init.renderToolsConst()





    const step1Name = "S1";
    const step2Name = "S2";
    const step3Name = "S3";
    const step4Name = "S4";
    const step5Name = "S5";
    const step6Name = "S6";


    const NavStep_1 = new NavStep(
        step1Name ,
        "https://localhost/component/Requests/RequestA/Component.php" ,
        [
            {
                name: "name1",
                type: String
            }
        ],
        null ,
        null ,
        false
    );
    const NavStep_2 = new NavStep(
        step2Name ,
        "https://localhost/component/Requests/RequestB/Component.php" ,
        [
            {
                name: "name2",
                type: String
            }
        ],
        null ,
        "targetA" ,
        true
    );
    const NavStep_3 = new NavStep(
        step3Name ,
        "https://localhost/component/Requests/RequestC/Component.php" ,
        [
            {
                name: "name3",
                type: String
            }
        ],
        null ,
        "targetA" ,
        true
    );
    const NavStep_4 = new NavStep(
        step4Name ,
        "https://localhost/component/Requests/RequestD/Component.php" ,
        [
            {
                name: "name4",
                type: String
            }
        ],
        null ,
        "targetB" ,
        true
    );
    const NavStep_5 = new NavStep(
        step5Name ,
        "https://localhost/component/Requests/RequestE/Component.php" ,
        [
            {
                name: "name5",
                type: String
            }
        ],
        null ,
        "targetB" ,
        true
    );
    const NavStep_6 = new NavStep(
        step6Name ,
        "https://localhost/component/Requests/RequestF/Component.php" ,
        [
            {
                name: "name6",
                type: String
            }
        ],
        null ,
        "targetC" ,
        true
    );



    const workflow = {
        step: NavStep_1,
        trans: "direction" ,
        workflow: [
            {
                step: NavStep_2,
                trans: "multi" ,
                workflow: [
                    {
                        step: NavStep_4,
                        trans: "direction" ,
                    } ,
                    {
                        step: NavStep_5,
                        trans: "direction" ,
                    } ,
                ]
            } ,
            {
                step: NavStep_3,
                trans: "multi" ,
                workflow: [
                    {
                        step: NavStep_6,
                        trans: "direction" ,
                    } ,
                ]
            }
        ]
    }


    const stepper = new NavStepper(
        "stepper" ,
        workflow
    );
</script>