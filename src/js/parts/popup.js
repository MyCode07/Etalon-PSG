import { isMobile } from "../utils/isMobile.js";
import { lockPadding, unLockPadding } from "../utils/lockPadding.js";

const wrapper = document.querySelector('.wrapper');
const partnershipPopup = document.querySelector('._popup#partnership');

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.hasAttribute('data-open-popup')) {
        e.preventDefault();
        const id = targetEl.getAttribute('data-id');
        const popup = document.querySelector(`._popup#${id}`);

        if (popup) {
            popup.classList.add('_open')
            wrapper.classList.add('_overlay')

            lockPadding();
        }
    }

    if (targetEl.classList.contains('_popup')) {
        targetEl.classList.remove('_open')
        closePopup(targetEl)
    }

    if (targetEl.classList.contains('_popup__close') || targetEl.hasAttribute('data-close-popup')) {
        const popup = targetEl.closest('._popup');
        closePopup(popup)
    }
})


function closePopup(popup) {
    popup.classList.remove('_open')

    if (popup.id != partnershipPopup.id && partnershipPopup.classList.contains('_open')) {
        //
    }
    else {
        wrapper.classList.remove('_overlay')
        unLockPadding();
    }
}