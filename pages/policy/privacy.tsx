import Link from "next/link"
import css from "./privacy.module.scss"

export default function privacy() {
  return(
    <div className={css.wrap}>
      <div>
        주간통계는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조취가 취해지고 있는지 알려드립니다.
        주간통계는 정말 최소한의 정보만을 수집하기위해 신경쓰고 있습니다.
      </div>
      
      <div>
        <h1>1. 수집하는 개인정보</h1>
        <p>
          - 이용자가 주간통계 채팅서비스및 각 서비스를 이용하기 위해 회원가입을 할 경우, 주간통계는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.<br />
          - 회원가입 시점에 주간통계이 이용자로부터 수집하는 개인정보는 아래와 같습니다.<br />
          - 회원 가입 시 필수항목으로 본인이 사용하는 이메일을 수집합니다.<br />
          - 회원 가입 후 유저 식별을 위한 닉네임 이 있으며, 닉네임 변경 기능을 제공 하고 있습니다.
        </p>
        <p>
          서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다.
        </p>
        <p>
          주간통계는 아래의 방법을 통해 개인정보를 수집합니다.
          <br />
          - 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우, 해당 개인정보를 수집합니다.<br />
          - 고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등을 통해 이용자의 개인정보가 수집될 수 있습니다.<br />
          - 기기정보와 같은 생성정보는 PC웹, 모바일 웹/앱 이용 과정에서 자동으로 생성되어 수집될 수 있습니다.
        </p>
      </div>

      <div>
        <h1>2. 수집한 개인정보의 이용</h1>
        <p>
          주간통계 및 주간통계 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리, 서비스 개발·제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.

          회원 가입 의사의 확인, 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
          {/* 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다. */}
          법령 및 주간통계 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
          유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제를 위하여 개인정보를 이용합니다.
          이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.
          서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.
          보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.
          {/* 주간통계는 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 통계작성, 과학적 연구, 공익적 기록 보존 등을 위하여 처리할 수 있습니다. 이 때 가명정보는 재식별되지 않도록 추가정보와 분리하여 별도 저장·관리하고 필요한 기술적·관리적 보호조치를 취합니다 */}
        </p>
      </div>

      <div>
        <h1>3. 개인정보의 제공 및 위탁</h1>
        <p>
          주간통계는 원칙적으로 이용자 동의 없이 개인정보를 외부에 제공하지 않습니다.
          주간통계는 이용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다. 
          {/* 단, 이용자가 외부 제휴사의 서비스를 이용하기 위하여 개인정보 제공에 직접 동의를 한 경우, 그리고 관련 법령에 의거해 네이버에 개인정보 제출 의무가 발생한 경우, 이용자의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한 경우에 한하여 개인정보를 제공하고 있습니다. */}
        </p>
        {/* <p>
          주간통계는 편리하고 더 나은 서비스를 제공하기 위해 업무 중 일부를 외부에 위탁하고 있습니다.
        </p> */}
      </div>

      <div>
        <h1>4. 개인정보의 파기</h1>
        <p>
          주간통계는 원칙적으로 이용자의 개인정보를 회원 탈퇴 또는 이용목적 달성 시 지체없이 파기하고 있습니다.
          단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.
        </p>
        <p>
          이용자에게 개인정보 보관기간에 대해 회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는 아래와 같습니다.<br />
          부정 가입 및 이용 방지<br />
            -탈퇴한 이용자의 회원정보 : 즉시 파기
        </p>
        {/* <p>
          전자상거래 등에서의 소비자 보호에 관한 법률, 전자문서 및 전자거래 기본법, 통신비밀보호법 등 법령에서 일정기간 정보의 보관을 규정하는 경우는 아래와 같습니다. 
          - 대금결제 및 재화 등의 공급에 관한 기록 : 5년 보관
        </p> */}
        <p>
          또한 주간통계는 ‘개인정보 유효기간제’에 따라 1년간 서비스를 이용하지 않은 회원의 개인정보를 별도로 분리 보관 또는 삭제하여 관리하고 있습니다.
        </p>
      </div>

      <div>
        <h1>5. 이용자 및 권리와 행사 방법</h1>
        <p>
          이용자는 언제든지 "마이페이지"에서 자신의 개인정보를 조회하거나 수정할 수 있습니다. <br />
          이용자는 언제든지 "마이페이지-회원탈퇴" 등을 통해 개인정보의 수집 및 이용 동의를 철회할 수 있습니다.
        </p>
      </div>

      <div>
        <h1>6. 개인인정보보호를 위한 주간통계의 노력</h1>
        <p>
          1.불필요하거나 민감한 개인정보는 수집하지 않고있습니다.
        </p>
        <p>
          2.개인정보를 안전하게 저장ㆍ전송할 수 있는 암호화 조치를 하고 있습니다.
        </p>
      </div>

      <div>
        <h1>7. 개인정보 보호책임자 및 담당자 안내</h1>
        주간통계는 이용자의 개인정보 관련 문의사항 및 불만 처리 등을 위하여 아래와 같이 개인정보 보호책임자 및 담당자를 지정하고 있습니다.
        <br /><br />
        책임자 : 주간통계 운영자 <br /><br /> <Link href="/support" style={{textDecoration:"underline"}}>문의하기 바로가기</Link>
      </div>

      <div>
        <h1>8. 본 개인정보처리방침의 적용 범위</h1>
        <p>
          본 개인정보처리방침은 회사의 브랜드 중 하나인 ‘주간통계’ 및 관련 제반 서비스(모바일 웹/앱 포함)에 적용되며, 다른 브랜드로 제공되는 서비스에 대해서는 별개의 개인정보처리방침이 적용될 수 있습니다.
        </p>
      </div>

      <div>
        <h1>9. 개정 전 고지 의무</h1>
        <p>본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 개정 최소 3일 전에 ‘공지사항’을 통해 사전 공지를 할 것입니다.</p>
        다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 공지하며, 필요 시 이용자 동의를 다시 받을 수도 있습니다.
      </div>

      <div>
        시행일자 : 2023년 7월 16일
      </div>
    </div>
  )
}










