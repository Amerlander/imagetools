import { TransformFactoryContext } from '../../types'
import { flop } from '../flop'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('flop', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "flop"', () => {
        const res = flop({ flop: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = flop({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-expect-error
            const res = flop({ flop: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = flop({ flop: '' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('true', () => {
            const res = flop({ flop: 'true' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('empty', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([flop({ flop: '' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('true', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([flop({ flop: 'true' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })
    })
})