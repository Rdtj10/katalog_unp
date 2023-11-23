import React from 'react'
import Link from 'next/link'

const NavHeader = () => {
    return (
        <div className='flex gap-5 justify-between mt-3'>
            <div>
                <Link href="/auth/login">
                    <button className='bg-[#FFA01A] py-2 px-7 rounded-2xl font-medium text-sm hover:bg-[#bc7005] hover:shadow-inner'>
                        Masuk
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/auth/daftar">
                    <button className='bg-[#FFA01A] py-2 px-7 rounded-2xl font-medium text-sm hover:bg-[#bc7005] hover:shadow-inner'>
                        Daftar
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default NavHeader