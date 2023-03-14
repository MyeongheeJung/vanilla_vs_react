const HtmlEl = document.documentElement
const FormEl = document.getElementById('form')
const IdEl = FormEl.querySelector('#id')
const IdMsgEl = FormEl.querySelector('#id-msg')
const PwEl = FormEl.querySelector('#pw')
const PwMsgEl = FormEl.querySelector('#pw-msg')
const PwCheckEl = FormEl.querySelector('#pw-check')
const PwCheckMsgEl = FormEl.querySelector('#pw-check-msg')
const SubmitEl = FormEl.querySelector('#submit')
const ModalEl = document.getElementById('modal')
const ConfirmIdEl = ModalEl.querySelector('#confirm-id')
const ConfirmPwEl = ModalEl.querySelector('#confirm-pw')
const CancleBtn = ModalEl.querySelector('#cancle-btn')
const ApproveBtn = ModalEl.querySelector('#approve-btn')
const IncreaseFontBtn = document.getElementById('increase-font-btn')
const DecreaseFontBtn = document.getElementById('decrease-font-btn')

// 유효성 검사 정규식
const ID_REGEX = /^[a-z0-9-_]{5,20}$/
const PW_REGEX = /^[a-zA-z0-9]{8,16}$/
// 커스텀 에러 메시지
const ERROR_MSG = {
  required: '필수 정보입니다.',
  invalidId: '5-20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
  invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
  invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}
// 폰트 사이즈 값 지정
const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

// 정규식으로 에러 판별
const checkRegex = (target) => {
  const { value, id } = target
  if (value === '') {
    return 'required'
  } else {
    switch (id) {
      case 'id':
        return ID_REGEX.test(value) ? true : 'invalidId'
      case 'pw':
        return PW_REGEX.test(value) ? true : 'invalidPw'
      case 'pw-check':
        return value === PwEl.value ? true : 'invalidPwCheck'
    }
  }
}

// input 필드 value 유효성 검사
const checkValidation = (target, msgTarget) => {
  const isValid = checkRegex(target)
  if (isValid !== true) {
    target.classList.add('border-red-600')
    msgTarget.innerText = ERROR_MSG[isValid]
  } else {
    target.classList.remove('border-red-600')
    msgTarget.innerText = ''
  }
  return isValid
}

// 제출시 유효성 검사 후 모달 오픈
const checkValidationAll = (e) => {
  e.preventDefault()
  const isValidAll =
    checkValidation(IdEl, IdMsgEl) === true &&
    checkValidation(PwEl, PwCheckEl) === true &&
    checkValidation(PwCheckEl, PwCheckMsgEl) === true

  if (isValidAll) {
    ConfirmIdEl.innerText = IdEl.value
    ConfirmPwEl.innerText = PwEl.value
    ModalEl.showModal()
  }
}

const getHtmlFontSize = () => {
  return parseFloat(window.getComputedStyle(HtmlEl).fontSize)
}

// 폰트 사이즈 컨트롤러
const onClickFontSizeControl = (flag) => {
  const fontSize = getHtmlFontSize()
  let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
  HtmlEl.style.fontSize = newFontSize
  DecreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
  IncreaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}

// 페이지 로드시  autofocus 적용
// window.addEventListener('load', () => {
//   IdEl.focus()
// })
IdEl.addEventListener('focusout', () => checkValidation(IdEl, IdMsgEl))
PwEl.addEventListener('focusout', () => checkValidation(PwEl, PwMsgEl))
PwCheckEl.addEventListener('focusout', () =>
  checkValidation(PwCheckEl, PwCheckMsgEl)
)
SubmitEl.addEventListener('click', (e) => checkValidationAll(e))
CancleBtn.addEventListener('click', () => ModalEl.close())
ApproveBtn.addEventListener('click', () => {
  alert('가입되었습니다 😁')
  ModalEl.close()
})
IncreaseFontBtn.addEventListener('click', () =>
  onClickFontSizeControl('increase')
)
DecreaseFontBtn.addEventListener('click', () =>
  onClickFontSizeControl('decrease')
)
